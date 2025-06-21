import React, { useState, useEffect } from 'react';
import { Camera, Calendar, Tag, Clock, CheckCircle, User, FileText, Upload, X, Save, Trash2, Edit, Search } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './CourseBlogDashboard.module.css';
import { addDoc, collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { db, storage } from '../../firebase';

const categories = [
  "Development", "Design", "Marketing", "Business", "Technology", "Programming", 
  "Web Development", "Mobile Development", "Data Science", "AI/ML", "DevOps", "UI/UX"
];

const CourseBlogDashboard = () => {
  const [formData, setFormData] = useState({
    title: '', 
    excerpt: '', 
    date: new Date().toISOString().split('T')[0],
    category: '', 
    readTime: '', 
    content: '',
    author: '',
    tags: '',
    createdAt: null // Initialize createdAt
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const articlesData = [];
      querySnapshot.forEach((doc) => {
        articlesData.push({ id: doc.id, ...doc.data() });
      });
      setArticles(articlesData);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
    const text = value.replace(/<[^>]*>/g, '').trim();
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    
    const readTime = Math.ceil(words / 200);
    if (readTime > 0) {
      setFormData(prev => ({ ...prev, readTime: `${readTime} min read` }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      excerpt: '', 
      date: new Date().toISOString().split('T')[0], 
      category: '', 
      readTime: '', 
      content: '',
      author: '',
      tags: '',
      createdAt: null
    });
    setImageFile(null);
    setImagePreview('');
    setWordCount(0);
    setError('');
    setSubmitSuccess(false);
    setIsEditing(false);
    setEditingArticleId(null);
  };

  const handleEditArticle = (article) => {
    setIsEditing(true);
    setEditingArticleId(article.id);
    setFormData({
      title: article.title || '',
      excerpt: article.excerpt || '',
      date: article.date || new Date().toISOString().split('T')[0],
      category: article.category || '',
      readTime: article.readTime || '',
      content: article.content || '',
      author: article.author || '',
      tags: article.tags ? article.tags.join(', ') : '',
      createdAt: article.createdAt || null,
      imageUrl: article.imageUrl || ''
    });
    setImagePreview(article.imageUrl || '');
    setWordCount(article.wordCount || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmitSuccess(false);
    setUploadProgress(0);

    try {
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!formData.content.trim() || formData.content === '<p><br></p>') {
        throw new Error('Content is required');
      }

      const auth = getAuth();
      if (!auth.currentUser && imageFile && !isEditing) {
        throw new Error('You must be logged in to upload images');
      }

      let imageUrl = isEditing ? formData.imageUrl || '' : '';
      if (imageFile) {
        const safeFileName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storageRef = ref(storage, `blog-images/${Date.now()}_${safeFileName}`);
        console.log('Uploading to:', storageRef.toString());
        
        try {
          const uploadTask = uploadBytesResumable(storageRef, imageFile);
          
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error('Upload error:', error.code, error.message);
              throw new Error(`Image upload failed: ${error.message}`);
            }
          );
          
          await uploadTask;
          imageUrl = await getDownloadURL(storageRef);
          console.log('Image uploaded, URL:', imageUrl);
        } catch (uploadError) {
          console.error('Upload failed:', uploadError);
          throw uploadError;
        }
      }

      const payload = { 
        ...formData, 
        imageUrl, 
        updatedAt: serverTimestamp(),
        status: isDraft ? 'draft' : 'published',
        wordCount: wordCount,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };

      // Remove createdAt if it's null or undefined to avoid invalid values
      if (!payload.createdAt) {
        delete payload.createdAt;
      }

      if (isEditing) {
        await updateDoc(doc(db, 'blog', editingArticleId), payload);
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'blog'), payload);
      }
      
      setSubmitSuccess(true);
      resetForm();
      fetchArticles();
      
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (err) {
      console.error('Error in handleSubmit:', err.code, err.message);
      setError(err.message || 'Failed to submit blog post');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const saveDraft = async () => {
    if (!formData.title.trim()) {
      setError('Title is required to save draft');
      return;
    }
    
    setIsDraft(true);
    await handleSubmit(new Event('submit'));
    setIsDraft(false);
  };

  const handleDeleteArticle = async (articleId, imageUrl) => {
    try {
      await deleteDoc(doc(db, 'blog', articleId));
      
      if (imageUrl) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (imageError) {
          console.log('Error deleting image:', imageError);
        }
      }
      
      fetchArticles();
      setDeleteConfirm(null);
      setError('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Failed to delete article');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    const plainText = text.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
  };

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ align: [] }],
      ['link', 'image', 'video', 'formula'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'link', 'image', 'video', 'formula',
    'blockquote', 'code-block'
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>
            <FileText className={styles.titleIcon} />
            {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
          </h2>
          <p className={styles.subtitle}>
            {isEditing ? 'Update your article content' : 'Share your knowledge and insights with the community'}
          </p>
        </div>
      </div>

      {submitSuccess && (
        <div className={styles.success}>
          <CheckCircle size={20} />
          <span>
            {deleteConfirm ? 'Article deleted successfully!' : 
             `Blog post ${isEditing ? 'updated' : isDraft ? 'saved as draft' : 'published'} successfully!`}
          </span>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className={styles.closeButton}
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      {error && (
        <div className={styles.error}>
          <span>{error}</span>
          <button 
            onClick={() => setError('')}
            className={styles.closeButton}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <label className={styles.label}>
            <FileText size={16} />
            Article Title *
          </label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            className={styles.input}
            placeholder="Enter an engaging title for your article..."
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>
            {/* <Eye size={16} /> */}
            Excerpt (Preview Text)
          </label>
          <textarea 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            rows={3} 
            className={styles.textarea}
            placeholder="Write a brief summary that will appear in article previews..."
          />
          <small className={styles.hint}>
            {formData.excerpt.length}/300 characters recommended
          </small>
        </div>

        <div className={styles.metadataRow}>
          <div className={styles.metadataItem}>
            <label className={styles.label}>
              <Calendar size={16} />
              Publish Date
            </label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              className={styles.input}
            />
          </div>
          
          <div className={styles.metadataItem}>
            <label className={styles.label}>
              <Tag size={16} />
              Category
            </label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className={styles.input}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.metadataItem}>
            <label className={styles.label}>
              <Clock size={16} />
              Read Time
            </label>
            <input 
              type="text" 
              name="readTime" 
              value={formData.readTime} 
              onChange={handleChange} 
              className={styles.input}
              placeholder="Auto-calculated"
              readOnly
            />
          </div>
        </div>

        <div className={styles.metadataRow}>
          <div className={styles.metadataItem}>
            <label className={styles.label}>
              <User size={16} />
              Author Name
            </label>
            <input 
              type="text" 
              name="author" 
              value={formData.author} 
              onChange={handleChange} 
              className={styles.input}
              placeholder="Your name"
            />
          </div>
          
          <div className={styles.metadataItem}>
            <label className={styles.label}>
              <Tag size={16} />
              Tags (comma-separated)
            </label>
            <input 
              type="text" 
              name="tags" 
              value={formData.tags} 
              onChange={handleChange} 
              className={styles.input}
              placeholder="react, javascript, tutorial"
            />
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>
            <Camera size={16} />
            Featured Image
          </label>
          
          {!imagePreview ? (
            <div className={styles.uploadArea}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className={styles.fileInput}
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className={styles.uploadLabel}>
                <Upload size={48} className={styles.uploadIcon} />
                <h3>Upload Featured Image</h3>
                <p>Click to browse or drag & drop your image here</p>
                <small>Supports JPG, PNG, GIF up to 5MB</small>
              </label>
            </div>
          ) : (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" className={styles.previewImage} />
              <button 
                type="button" 
                onClick={removeImage}
                className={styles.removeImageBtn}
              >
                <X size={16} />
                Remove Image
              </button>
            </div>
          )}
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${uploadProgress}%` }}
              />
              <span className={styles.progressText}>{Math.round(uploadProgress)}%</span>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <label className={styles.label}>
            <FileText size={16} />
            Article Content *
          </label>
          <div className={styles.editorContainer}>
            <ReactQuill 
              value={formData.content} 
              onChange={handleContentChange} 
              modules={quillModules}
              formats={quillFormats}
              className={styles.editor}
              placeholder="Start writing your article content here..."
              theme="snow"
            />
            <div className={styles.editorStats}>
              <span className={styles.wordCount}>
                {wordCount} words
              </span>
              <span className={styles.readTime}>
                ~{Math.ceil(wordCount / 200)} min read
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.leftActions}>
            <button 
              type="button" 
              onClick={resetForm} 
              className={styles.resetBtn}
              disabled={isSubmitting}
            >
              <X size={16} />
              {isEditing ? 'Cancel Edit' : 'Reset Form'}
            </button>
            
            <button 
              type="button" 
              onClick={saveDraft} 
              className={styles.draftBtn}
              disabled={isSubmitting || !formData.title.trim()}
            >
              <Save size={16} />
              Save Draft
            </button>
          </div>
          
          <div className={styles.rightActions}>
            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={isSubmitting || !formData.title.trim() || (!formData.content.trim() || formData.content === '<p><br></p>')}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  {isDraft ? 'Saving Draft...' : isEditing ? 'Updating...' : 'Publishing...'}
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  {isEditing ? 'Update Article' : 'Publish Article'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginTop: '2rem',
        overflow: 'hidden',
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FileText size={20} />
              Published Articles ({filteredArticles.length})
            </h3>
          </div>
          
          <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
            <Search 
              size={18} 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}
            />
            <input
              type="text"
              placeholder="Search blogs by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem',
            color: '#6b7280'
          }}>
            <div className={styles.spinner} style={{ marginBottom: '1rem' }}></div>
            <p style={{ margin: 0 }}>Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem',
            color: '#6b7280'
          }}>
            <FileText size={48} style={{ marginBottom: '1rem', color: '#d1d5db' }} />
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              {searchTerm ? 'No articles found' : 'No Articles Yet'}
            </h4>
            <p style={{ margin: 0, textAlign: 'center' }}>
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first article using the form above'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '1000px',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Title
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Author
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Date and Time
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article, index) => (
                  <tr 
                    key={article.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9fafb';
                    }}
                  >
                    <td style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #e5e7eb',
                      verticalAlign: 'top'
                    }}>
                      <div style={{
                        fontWeight: '700',
                        color: '#1f2937',
                        lineHeight: '1.4',
                        marginBottom: '4px'
                      }}>
                        {article.title}
                      </div>
                      {article.excerpt && (
                        <div style={{
                          color: '#6b7280',
                          fontSize: '13px',
                          lineHeight: '1.4'
                        }}>
                          {truncateText(article.excerpt, 80)}
                        </div>
                      )}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#374151',
                      fontWeight: '700'
                    }}>
                      {article.author || 'Anonymous'}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#6b7280',
                      fontSize: '13px'
                    }}>
                      {formatDate(article.createdAt)}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #e5e7eb',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <button
                          onClick={() => handleEditArticle(article)}
                          style={{
                            padding: '6px 8px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#3b82f6';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          title="Edit Article"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
                              handleDeleteArticle(article.id, article?.imageUrl);
                            }
                          }}
                          style={{
                            padding: '6px 8px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#dc2626';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ef4444';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          title="Delete Article"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBlogDashboard;
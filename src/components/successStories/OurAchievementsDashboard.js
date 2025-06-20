import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Trash2, User, Building, TrendingUp, Search, Filter, Edit2 } from 'lucide-react';
import { collection, db, storage } from '../../firebase';
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Loading from '../extraComponents/loading';

const OurAchievementsDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        applicableSection: '',
        profileImage: null,
        profileImagePreview: '',
        hike: '',
        preCompany: null,
        preCompanyPreview: '',
        postCompany: null,
        postCompanyPreview: '',
        startCompanyType: '',
    });

    const [achievements, setAchievements] = useState([]);
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedSection, setSelectedSection] = useState('all');
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [editingId, setEditingId] = useState(null); // Track the achievement being edited
    const profileImageRef = useRef(null);
    const preCompanyRef = useRef(null);
    const postCompanyRef = useRef(null);

    // Predefined sections/programs for the form dropdown
    const predefinedSections = [
        'Full Stack Development - Java',
        'Full Stack Development - Python',
        'Data Science & AI',
        'Digital Marketing',
    ];

    const availableSections = useMemo(() => {
        const uniqueSections = [...new Set(achievements.map(achievement => achievement.applicableSection).filter(Boolean))];
        return uniqueSections.sort();
    }, [achievements]);

    const sectionStats = useMemo(() => {
        const stats = {};
        achievements.forEach(achievement => {
            const section = achievement.applicableSection;
            if (section) {
                stats[section] = (stats[section] || 0) + 1;
            }
        });
        return stats;
    }, [achievements]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setFormData(prev => ({
            ...prev,
            [name]: file,
            [`${name}Preview`]: previewUrl,
        }));
    };

    const handleEdit = (achievement) => {
        setEditingId(achievement.id);
        setFormData({
            name: achievement.name,
            role: achievement.role,
            applicableSection: achievement.applicableSection,
            profileImage: null,
            profileImagePreview: achievement.profileImage || '',
            hike: achievement.hike,
            preCompany: null,
            preCompanyPreview: achievement.preCompany || '',
            postCompany: null,
            postCompanyPreview: achievement.postCompany || '',
            startCompanyType: achievement.startCompanyType,
        });
        // Clear file input fields
        if (profileImageRef.current) profileImageRef.current.value = '';
        if (preCompanyRef.current) preCompanyRef.current.value = '';
        if (postCompanyRef.current) postCompanyRef.current.value = '';
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            name: '',
            role: '',
            applicableSection: '',
            profileImage: null,
            profileImagePreview: '',
            hike: '',
            preCompany: null,
            preCompanyPreview: '',
            postCompany: null,
            postCompanyPreview: '',
            startCompanyType: '',
        });
        setFormErrors({});
        // Clear file input fields
        if (profileImageRef.current) profileImageRef.current.value = '';
        if (preCompanyRef.current) preCompanyRef.current.value = '';
        if (postCompanyRef.current) postCompanyRef.current.value = '';
    };

    const handleSubmit = async () => {
        const errors = {};

        if (!formData.name?.trim()) errors.name = 'Name is required';
        if (!formData.role?.trim()) errors.role = 'Role is required';
        if (!formData.applicableSection?.trim()) errors.applicableSection = 'Applicable section is required';
        if (!formData.hike?.trim()) errors.hike = 'Hike is required';
        if (!formData.startCompanyType?.trim()) errors.startCompanyType = 'Start company type is required';
        if (!editingId && !formData.profileImage) errors.profileImage = 'Profile image is required';
        if (!editingId && !formData.preCompany) errors.preCompany = 'Pre company logo is required';
        if (!editingId && !formData.postCompany) errors.postCompany = 'Post company logo is required';

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0];
            alert(firstError);
            return;
        }

        setLoading(true);
        try {
            const timestamp = Date.now();
            const uploadImage = async (file, pathPrefix, existingUrl) => {
                if (!file) return existingUrl || '';
                const storageRef = ref(storage, `${pathPrefix}/${timestamp}_${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            };

            const profileImageUrl = await uploadImage(formData.profileImage, 'profileImages', formData.profileImagePreview);
            const preCompanyLogoUrl = await uploadImage(formData.preCompany, 'companyLogos/pre', formData.preCompanyPreview);
            const postCompanyLogoUrl = await uploadImage(formData.postCompany, 'companyLogos/post', formData.postCompanyPreview);

            const achievementData = {
                name: formData.name.trim(),
                role: formData.role.trim(),
                applicableSection: formData.applicableSection.trim(),
                profileImage: profileImageUrl,
                hike: formData.hike.trim(),
                preCompany: preCompanyLogoUrl,
                postCompany: postCompanyLogoUrl,
                startCompanyType: formData.startCompanyType.trim(),
                dateAdded: editingId ? achievements.find(a => a.id === editingId).dateAdded : new Date().toISOString(),
            };

            if (editingId) {
                // Update existing achievement
                const achievementRef = doc(db, "successStories-studentAchievements", editingId);
                await updateDoc(achievementRef, achievementData);
                setAchievements(prev => prev.map(item => item.id === editingId ? { id: editingId, ...achievementData } : item));
                alert('Student achievement updated successfully!');
            } else {
                // Add new achievement
                const docRef = await addDoc(collection(db, "successStories-studentAchievements"), achievementData);
                setAchievements(prev => [...prev, { id: docRef.id, ...achievementData }]);
                alert('Student achievement added successfully!');
            }

            // Reset form
            handleCancelEdit();
        } catch (error) {
            console.error("Error processing achievement: ", error);
            alert('An error occurred while saving the achievement.');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student record?')) {
            setLoading(true);
            try {
                await deleteDoc(doc(db, "successStories-studentAchievements", id));
                setAchievements(prev => prev.filter(item => item.id !== id));
                if (editingId === id) handleCancelEdit();
            } catch (err) {
                console.error("Failed to delete record:", err);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAchievements = async () => {
            const snapshot = await getDocs(collection(db, "successStories-studentAchievements"));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAchievements(data);
        };
        fetchAchievements();
    }, []);

    const filteredAchievements = achievements.filter(achievement => {
        const roleMatch = selectedRole === 'all' || achievement.role === selectedRole;
        const sectionMatch = selectedSection === 'all' || achievement.applicableSection === selectedSection;
        return roleMatch && sectionMatch;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Achievements Dashboard</h1>
                    <p className="text-gray-600">Track and manage student career achievements and job transitions</p>
                </div>
                {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
                        <Loading />
                    </div>
                )}
                {/* Form Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {editingId ? 'Edit Student Achievement' : 'Add New Student Achievement'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                placeholder="Enter student name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter role (e.g., Full Stack Developer)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Applicable Section/Program <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="applicableSection"
                                value={formData.applicableSection}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select applicable section</option>
                                {predefinedSections.map(section => (
                                    <option key={section} value={section}>{section}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Select the course/program/batch this student belongs to</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image<span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                name="profileImage"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={profileImageRef}
                            />
                            {formData.profileImagePreview && (
                                <div className="mt-2">
                                    <img src={formData.profileImagePreview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Hike<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="hike"
                                value={formData.hike}
                                placeholder="e.g., 60% Hike or ₹5L increase"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Company Logo<span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                name="preCompany"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={preCompanyRef}
                            />
                            {formData.preCompanyPreview && (
                                <div className="mt-2">
                                    <img src={formData.preCompanyPreview} alt="Previous Company" className="w-12 h-12 object-contain border border-gray-200 rounded" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Company Logo<span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                name="postCompany"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={postCompanyRef}
                            />
                            {formData.postCompanyPreview && (
                                <div className="mt-2">
                                    <img src={formData.postCompanyPreview} alt="Current Company" className="w-12 h-12 object-contain border border-gray-200 rounded" />
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Started From (Company Name)<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="startCompanyType"
                                value={formData.startCompanyType}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                placeholder="e.g., Startup, MNC, Service-based, Product-based"
                            />
                            <p className="text-xs text-gray-500 mt-1">Type of company where the student started their career</p>
                        </div>

                        <div className="md:col-span-2 flex gap-4">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Processing...' : editingId ? 'Update Achievement' : 'Add Achievement'}
                            </button>
                            {editingId && (
                                <button
                                    onClick={handleCancelEdit}
                                    disabled={loading}
                                    className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-gray-700 transition duration-200 font-medium"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            All Students ({achievements.length})
                        </h2>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Section:</label>
                                <select
                                    value={selectedSection}
                                    onChange={(e) => setSelectedSection(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-48"
                                >
                                    <option value="all">All Sections ({achievements.length})</option>
                                    {availableSections.map(section => (
                                        <option key={section} value={section}>
                                            {section} ({sectionStats[section]})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-md text-purple-800 text-sm font-medium">
                                Showing: {filteredAchievements.length} students
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students List */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">Students List</h3>
                    </div>

                    {filteredAchievements.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            {achievements.length === 0 ? (
                                <div>
                                    <User size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg mb-2">No students added yet</p>
                                    <p className="text-sm">Add your first student achievement above to get started!</p>
                                </div>
                            ) : (
                                <div>
                                    <Search size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg mb-2">No students found for: <strong>{selectedRole}</strong></p>
                                    <p className="text-sm">Try selecting a different role or add students for this role.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 max-h-[650px] overflow-y-auto">
                            {filteredAchievements.slice(0, 51).map((achievement) => (
                                <div key={achievement.id} className="p-6 hover:bg-gray-50 transition duration-150">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {achievement.profileImage ? (
                                                    <img
                                                        src={achievement.profileImage}
                                                        alt={achievement.name}
                                                        className="w-16 h-16 rounded-full object-cover border-4 border-blue-500"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                                                        <User size={24} className="text-gray-500" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="text-lg font-semibold text-gray-900">{achievement.name}</h4>
                                                    {achievement.hike && (
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                                            <TrendingUp size={14} />
                                                            {achievement.hike}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-blue-600 font-medium mb-1">{achievement.role}</p>
                                                <p className="text-green-600 font-medium text-sm mb-2">{achievement.applicableSection}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span>Added: {achievement.dateAdded}</span>
                                                    {achievement.startCompanyType && (
                                                        <span>Started from: <strong className="text-gray-700">{achievement.startCompanyType}</strong></span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                {achievement.preCompany && (
                                                    <div className="text-center">
                                                        <p className="text-xs text-gray-500 mb-1">Previous</p>
                                                        <img src={achievement.preCompany} alt="Previous Company" className="w-10 h-10 object-contain border border-gray-200 rounded" />
                                                    </div>
                                                )}

                                                {achievement.preCompany && achievement.postCompany && (
                                                    <div className="text-gray-400 mx-2 text-lg">→</div>
                                                )}

                                                {achievement.postCompany && (
                                                    <div className="text-center">
                                                        <p className="text-xs text-gray-500 mb-1">Current</p>
                                                        <img src={achievement.postCompany} alt="Current Company" className="w-10 h-10 object-contain border border-gray-200 rounded" />
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handleEdit(achievement)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition duration-200"
                                                title="Edit student"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(achievement.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition duration-200"
                                                title="Delete student"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Card View Section */}
                {achievements.length > 0 && (
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            Card View ({filteredAchievements.length} students)
                        </h3>
                        <div className="flex overflow-x-auto gap-6 pb-4">
                            {filteredAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
                                    style={{ minWidth: '320px', height: '280px' }}
                                >
                                    <div className="flex items-start space-x-4 mb-4">
                                        <div className="flex-shrink-0">
                                            {achievement.profileImage ? (
                                                <img
                                                    src={achievement.profileImage}
                                                    alt={achievement.name}
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                                                    <User size={24} className="text-gray-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-semibold text-gray-900 text-lg">{achievement.name}</h5>
                                            <p className="text-blue-600 font-medium text-sm mb-1">{achievement.role}</p>
                                            <p className="text-green-600 font-medium text-xs mb-2">{achievement.applicableSection}</p>
                                            {achievement.hike && (
                                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                    {achievement.hike}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-around items-center mb-4">
                                        <div className="text-center">
                                            <p className="text-gray-500 text-xs mb-2">Previous</p>
                                            {achievement.preCompany ? (
                                                <img src={achievement.preCompany} alt="Previous Company" className="w-auto h-10 mx-auto object-contain" />
                                            ) : (
                                                <div className="w-12 h-10 bg-gray-100 rounded flex items-center justify-center">
                                                    <span className="text-xs text-gray-400">N/A</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-gray-400 text-xl">→</div>
                                        <div className="text-center">
                                            <p className="text-gray-500 text-xs mb-2">Current</p>
                                            {achievement.postCompany ? (
                                                <img src={achievement.postCompany} alt="Current Company" className="w-auto h-10 mx-auto object-contain" />
                                            ) : (
                                                <div className="w-12 h-10 bg-gray-100 rounded flex items-center justify-center">
                                                    <span className="text-xs text-gray-400">N/A</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <hr className="my-3" />
                                    <p className="text-gray-500 text-xs text-center mb-3">
                                        Started from<br />
                                        <strong className="text-gray-900">{achievement.startCompanyType || 'Not specified'}</strong>
                                    </p>

                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => handleEdit(achievement)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(achievement.id)}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurAchievementsDashboard;
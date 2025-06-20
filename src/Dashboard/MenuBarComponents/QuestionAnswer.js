import React from 'react';
import emptystate from '../../assets/emptystate.svg'
const QuestionAnswer = () => {
    return (
        <div className='container-fluid p-3 mb-4'>
           <h3>Question & Answer</h3>
           <div className='row'>
           <form>
            <div className='col-1 col-lg-2 col-sm-12'>
           <label htmlFor='sortby'>sort by:</label>
           </div>
           <div className='col-12 col-lg-6 col-sm-12'>
    <select className="form-select" aria-label="Default select example">
  <option value="1">All(0)</option>
  <option value="2">Read(0)</option>
  <option value="3">Unread(0)</option>
  <option value="3">Important(0)</option>
  <option value="3">Archived(0)</option>
</select>

</div>
</form>
</div>
<img src={emptystate} alt='emptystate-Image' className='m-2'
 style= {{   alignSelf: 'center',
  justifySelf: 'center',
   height: 'auto',
 width: '100%'}}
></img>
<p style={{textAlign:'center'}}>No Data Available in this Section</p> 
        </div>
    );
};

export default QuestionAnswer;
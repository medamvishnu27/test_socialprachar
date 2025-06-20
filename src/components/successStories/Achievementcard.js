import React from 'react';

const Achievementcard = ({ achievement }) => (
    <div className="card text-center p-3 shadow-sm" style={{ minWidth: '330px', height: '250px', borderRadius: '12px' }}>
        <div className="d-flex text-start align-items-center">
            <div>
                <img src={achievement.profileImage} alt={achievement.name} className="rounded-circle mb-2" style={{ width: '80px', height: '80px', border: '4px solid #553cdf', marginRight: '16px' }} />
            </div>
            <div>
                <h5 className="card-title">{achievement.name}</h5>
                <p className="text-muted mb-2" style={{ fontSize: '14px' }}>{achievement.role}</p>
                <span className="badge py-1 px-3" style={{ color: '#553cdf', borderRadius: '12px', fontSize: '12px', background: '#543cdf31' }}>
                    {achievement.hike}
                </span>
            </div>
        </div>

        <div className="d-flex justify-around align-items-center">
            <div className="text-center">
                <p className="text-muted text-xs mb-1 fw-bold">Pre Social Prachar</p>
                {achievement.preCompany ? (
                    <img src={achievement.preCompany} alt="Previous Company" className="w-auto h-10 mx-auto object-contain" />
                ) : (
                    <div className="w-12 h-10 bg-light rounded d-flex align-items-center justify-content-center">
                        <span className="text-muted small">N/A</span>
                    </div>
                )}
            </div>
            <div className="text-muted fs-4 mx-3">→</div>
            <div className="text-center">
                <p className="text-muted text-xs mb-1 fw-bold">Post Social Prachar</p>
                {achievement.postCompany ? (
                    <img src={achievement.postCompany} alt="Current Company" className="w-auto h-10 mx-auto object-contain" />
                ) : (
                    <div className="w-12 h-10 bg-light rounded d-flex align-items-center justify-content-center">
                        <span className="text-muted small">N/A</span>
                    </div>
                )}
            </div>
        </div>

        
        <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
            <hr className="my-1" />
            Started from <br />
            <strong className="text-dark">{achievement.startCompanyType}</strong>
        </p>
    </div>
);
  
export default Achievementcard;
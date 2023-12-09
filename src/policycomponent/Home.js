import React,{useState} from 'react';
import Membership from './membership';
import MembershipMemberAdd from './membershipMemberAdd';
import MemberDetails from './memberDetails';

const Home = () => {
    const[check, setCheck] = useState(false);
    const[formData, setFormData] = useState(false);
    const[gridData, setGridData] = useState(false);
    const handlerClick = (e, name) => {
        e.preventDefault();
        if(name ==='self'){
            setCheck(false);
        } else {
            setCheck(true);
        }
    }
   
    const handlerPro = (proceed) =>{
        setFormData(proceed);
    }

    const handleNextPro =(proceed)=>{
        setGridData(proceed);
    }
    return(
        <>
            <div className='container'>
                <div className='d-flex justify-content-center flex-nowrap header'>
                    <h1>Choose Members</h1>
                </div>
                <div className="d-flex justify-content-center flex-nowrap">
                    <div className=" mx-2 p-2">
                        <button className='btn memberButton' name="btnSelf" onClick={(e)=>handlerClick(e, 'self')} >
                            <span className={!check? `myClass btnMember`:`myClass border`}>
                                <i className='fa fa-user'/>
                            </span>
                            <p>Self</p>
                        </button>
                    </div>
                    <div className=" mx-2 p-2">
                        <button className='btn memberButton' name="family" onClick={(e)=>handlerClick(e, 'family')}>
                            <span className={check? `myClass btnMember`:`myClass border`}>
                                <i className='fas fa-users'/>
                            </span>
                            <p>Family</p>
                        </button>
                    </div>
                </div>
            </div>
           
            {!formData && !gridData &&(<Membership check={check} handlerPro={handlerPro}/>)}
            {formData && !gridData &&(<MembershipMemberAdd formDataStatus={formData} handleNextPro={handleNextPro}/>)}
            {gridData &&(<MemberDetails/>)}
        </>
    )
}

export default Home
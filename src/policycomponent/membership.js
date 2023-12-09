import React,{useState} from 'react';
import { useDispatch} from 'react-redux';
import { membershipInfo } from '../Reducer/MembershipSlice/membershipSlice';


const Membership = ({check, handlerPro}) => {
    const dispatch = useDispatch();
  
    const[boyCounter, setBoyCounter] = useState(0);
    const[girlCounter, setGirlCounter]= useState(0);
    const [memberData, setMemberData] = useState({
        type:'',
        dependantSon:0,
        dependantGirl:0,
        emailId:'',
        mobileNo:'',
        spouse:false,
        girl:false,
        boy:false
    });

    const[error, setError] = useState({
        errorEmail:'',
        errorMobileNo:'',
        errorDependantSon:'',
        
    })

    const handlerIncrement = (e, gender) => {
        e.preventDefault();
        let son=[];
        let girl=[];
        if(gender === 'son'){
        setBoyCounter(boyCounter+1);
       
        // eslint-disable-next-line no-useless-computed-key
        son.push(boyCounter+1);
        setMemberData({...memberData, ['dependantSon']:son});
        } else {
            setGirlCounter(girlCounter+1);
            girl.push(girlCounter+1);
            setMemberData({...memberData, ['dependantGirl']:girl});
        }
    }

    const handlerDecrement = (e, gender) =>{

        e.preventDefault();
        
        if(gender === 'son'){
            setBoyCounter(boyCounter-1);
            setMemberData({...memberData, ['dependantSon']:boyCounter-1});
        } else {
            setGirlCounter(girlCounter-1);
            setMemberData({...memberData, ['dependantGirl']:girlCounter-1});
        }
    }

    const handlerChange = (e) =>{
        e.preventDefault();
        setMemberData({...memberData, [e.target.name]:e.target.value});
    }
   
    const handlerChecked =(e, name)=>{
        e.preventDefault();
        if(name==='spouse'){
            setMemberData({...memberData, [name]:e.target.checked});
        } else if(name ==='girl'){
            setMemberData({...memberData, [name]:e.target.checked});
        }
        else if(name==='boy'){
            setMemberData({...memberData, [name]:e.target.checked});
        }
    }

    const validation = () => {
        const{emailId, mobileNo} = memberData;
        let isValid= false;
        if(emailId === ''){
            setError((error) => {
                return{
                    ...error, ['errorEmail']:'Please enter the EmailId'
                };
            });
            isValid= false;
        } else {
            setError((error) => {
                return{
                    ...error, ['errorEmail']:''
                };
            });
            isValid= true;
        }
        if(mobileNo === ''){
            setError((error) => {
                return{
                    ...error, ['errorMobileNo']:'Please enter the MobileNo'
                };
            });
            isValid= false;
        } else {
            setError((error) => {
                return{
                    ...error, ['errorMobileNo']:''
                };
            });
            isValid= true;
        }
        return isValid;
    }

    const handlerProceed = (e) => {
        e.preventDefault();
        if(validation()) {
            dispatch(membershipInfo(memberData));
            handlerPro(true);
        }
    }

    return(
        <>
            <div className="d-flex align-items-center justify-content-center text-center not-found-container">
                <div>
                    {check&&(<div className='rows'>
                        <div className='row'>
                            <div className='col'>
                                <div style={{marginBottom:'3rem'}}>
                                    <button className='btn familyMemberButton'>
                                        <span className={check?'myClass btnMember':'myClass border'}>
                                            <i className='fa fa-user'/>
                                        </span>
                                        <input type="checkbox" className='familyMemberCheckBox' name="self"  onChange={(e) =>handlerChecked(e, 'self' )}/>
                                          <p>Self</p>
                                    </button>
                                </div>
                            </div>
                            <div className='col'>
                                <div style={{marginBottom:'3rem'}}>
                                    <button className='btn familyMemberButton'>
                                        <span className={check?'myClass btnMember':'myClass border'}>
                                            <i className='fas fa-female'/>
                                        </span>
                                        <input type="checkbox" className='familyMemberCheckBox' name="spouse" checked={memberData.spouse}  onChange={(e) =>handlerChecked(e, 'spouse' )}/>
                                        <p>Spouse</p>
                                    </button>
                                </div>
                            </div>
                            <div className='col'>
                                <div style={{marginBottom:'0.5rem'}}>
                                <button className='btn familyMemberButton'>
                                    <span className={check?'myClass btnMember':'myClass border'}>
                                            <i className='fas fa-female'/></span>
                                            <input type="checkbox" className='familyMemberCheckBox' name="girl" checked={memberData.girl}  onChange={(e) =>handlerChecked(e, 'girl' )}/>
                                            <p>Dependant<br/> girl</p>
                                        </button>
                                </div>
                                {memberData.girl&&(<div className="sectionNoOfChildren">
                                    <button className='btn'  onClick={(e)=> handlerIncrement(e, 'girl')} >+</button>
                                    <input className="form-control" style={{width:'50px'}} type="text" value={girlCounter}/>
                                    <button className='btn'  onClick={(e)=> handlerDecrement(e, 'son')} >-</button>
                                </div>
                                )}
                            </div>
                            <div className='col'>
                            <div style={{marginBottom:'0.5rem'}}>
                            <button className='btn familyMemberButton'>
                                <span className={check?'myClass btnMember':'myClass border'}>
                                        <i className='fas fa-male'/></span>
                                        <input type="checkbox" className='familyMemberCheckBox' name="boy" checked={memberData.boy} onChange={(e) =>handlerChecked(e, 'boy' )}/>
                                        <p>Dependant<br/> son</p>
                                    </button>
                                </div>
                               {memberData.boy&&(<div className="sectionNoOfChildren">
                                    <button className='btn' onClick={(e)=> handlerIncrement(e, 'son')}>+</button>
                                    <input className="form-control" style={{width:'50px'}} type="text" value={boyCounter}/>
                                    <button className='btn' onClick={(e)=>handlerDecrement(e, 'son')}>-</button>
                                </div>)}
                            </div>
                        </div>
                    </div>)}
                    <div  className='rows'>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" 
                                className="form-control" 
                                placeholder="MobileNo(10-digit)" 
                                name="mobileNo" 
                                onChange={(e)=>handlerChange(e)}
                                />
                                <p className='text-red'>{error.errorMobileNo? error.errorMobileNo:''}</p>
                            </div>
                            <div className="col-6">
                                <input type="text" 
                                className="form-control" 
                                placeholder="Email Id" 
                                name="emailId" 
                                onChange={(e)=>handlerChange(e)}
                                />
                                <p className='text-red'>{error.errorEmail? error.errorEmail:''}</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <span className='border-4'>
                        <button className="btn btn-danger btn-sm float-end fs-5" onClick={(e)=>handlerProceed(e)}>  
                            Proceed  
                        </button>  
                    </span>
                </div>
            </div>
        </>
    );
};

export default Membership;
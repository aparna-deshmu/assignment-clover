import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { membershipInfo } from '../Reducer/MembershipSlice/membershipSlice';
import moment from 'moment';

const MembershipMemberAdd = ({formDataStatus, handleNextPro}) => {
    const dispatch = useDispatch();
    const memberStateData = useSelector((state)=>state.membershipState);
    const{membership}=memberStateData;
    const [formData, setFormData] = useState([]);
    const [dependantGirl, setDependantGirl] = useState();
    const [dependantBoy, setDependantBoy] = useState();
    useEffect(()=>{
        let boy=[];
        let girl=[]
        for(let i=0;  i<membership.dependantGirl; i++){
            girl.push(i)
        }
        for(let j=0;  j<membership.dependantBoy; j++){
            girl.push(j)
        }
        setDependantBoy(boy);
        setDependantGirl(girl);
    },[memberStateData]);
    
    const handleProceed = (e) =>{
        e.preventDefault();
        handleNextPro(true);
        dispatch(membershipInfo(formData));
    }
   
    return(
     <>
        <div className="container">
            <>
                <FamilyMemberForm index={0} member={'self'} setFormData={setFormData}/>
            </>
            {formDataStatus ?
            <>
            {dependantBoy &&dependantBoy.map((boy, index) => (
                <>
                    <FamilyMemberForm index={index+1} member={`dependantSon${index+1}`} setFormData={setFormData}/>
                </>
                )
            )}
             {dependantGirl &&dependantGirl.map((girl, index) => (
                <>
                   <FamilyMemberForm index={index+1}  member={`dependantDaughter${index+1}`} setFormData={setFormData}/>
                </>
                )
            )}
            </> :""}
            <hr/>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn btn-outline-danger me-md-2" type="button" onClick={(e)=>handleProceed(e)}>  
                    Proceed  
                </button>  
                <button className="btn btn btn-outline-danger" type="type">  
                        Back
                </button>  
            </div>  
        </div>
        
     </>
    );
}

export default  MembershipMemberAdd;

const FamilyMemberForm = ({index, member, setFormData}) => {
    const gender=[
        {id :"1", value: "Male"},
        {id :"2", value: "Female"}
        ];
   
    const [memberData, setMemberData] = useState({
        id:'',
        name:'',
        gender:'',
        dob:''
    }); 
   

    useEffect(()=>{
            setMemberData({...memberData, ['id']: member});
    }, [member]);

    const handlerChange = (e) =>{
        e.preventDefault();
        const{name}=e.target;
       
        setMemberData({...memberData, [name]: e.target.value});
    }
    
    const handlerClick = (e) => {
        e.preventDefault();
        setFormData(current => [...current, memberData]);
    }
       
    return (
        <>
            <div className="row row-cols-5 text-center" key={index}>
                <div className="col">  
                <label for="from"></label><br/>           
                    <label for="from">{member !== 'self' ?`${member}`:'self'}</label>
                </div>
                <div className="col">   
                    <input type="text" className="form-control form-text" name={'name'} onChange={(e) => handlerChange(e)} placeholder='Enter the name'/>
                </div>
                <div className="col">
                    <select className='form-select' name={'gender'} onChange={(e) => handlerChange(e)}>
                        {gender.map((gen, index) => (
                            <option key={index} value={gen.id}>
                                {gen.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <input
                        max={moment().format("YYYY-MM-DD")}
                        type="date"
                        name="dob"
                        id="BD"
                        className="form-control form-text"
                        onChange={(e) => handlerChange(e)}
                    />
                    
                </div>
                <div className="col">
                    <button onClick={(e) => handlerClick(e)} className='btn btn-primary memberDataButton'>Add</button>
                    
                </div>
            </div>
        </>
    )
}
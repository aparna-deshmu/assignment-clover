import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { membershipDelete } from '../Reducer/MembershipSlice/membershipSlice';

const MemberDetails = () => {
  const screenSize = useScreenSize();
  const dispatch = useDispatch();
  const memberStateData = useSelector((state)=>state.membershipState);
  const{membership} = memberStateData;
  useEffect(() => {
    setMemberData(membership);
  }, []);
  const [memberData, setMemberData] = useState();
  const [slideLeft, setSlideLeft] = useState(0);
  const [hideButtonLeft, setHideButtonLeft] = useState(true);
  const [hideButtonRight, setHideButtonRight] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  
  
  const moveRight = () => {
    const el = document.getElementById(`hscroll`);
    setSlideLeft((el.scrollLeft += 200));
  };

  const moveLeft = () => {
    const el = document.getElementById(`hscroll`);
    setSlideLeft((el.scrollLeft -= 200));
  };

  const onHScroll = () => {
    const el = document.getElementById(`hscroll`).scrollLeft;
    if (el > 0) {
      setHideButtonLeft(false);
    } else {
      setHideButtonLeft(true);
    }
    if (el < sliderWidth) {
      setHideButtonRight(false);
    } else {
      setHideButtonRight(true);
    }
  };

  const handlerDelete = (e, id) =>{
    e.preventDefault();
     dispatch(membershipDelete(id));
  }
 
  return (
    <>
      <div className='container'>
      {screenSize.width > 1000 ?  
        <>  
          <table className="table">
            <thead className="table-dark">
              <tr>
              <th scope="col">Member</th>
              <th scope="col">Full Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Dob</th>
              <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {memberData && memberData.map((member, index) =>{
                return(
                  <tr key={index}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.gender}</td>
                  <td>{member.dob}</td>
                  <td><button onClick={(e) => handlerDelete(e, member.id)}><span><i className='fa fa-trash'/></span></button></td>
                  </tr>
                )
              })};
            </tbody>
          </table>
        </>:<>

        <div className="memberrDetails">
        <section>
          <button onClick={()=>moveLeft()} >
            <span>
              <i className='fas fa-arrow-left'/>
            </span>
          </button>
          <button onClick={()=>moveRight()}>
          <span>
              <i className='fas fa-arrow-right'/>
            </span>
          </button>
        </section>
        <hr style={{ backgroundColor: "black" }} />
        <div className="flex-container" id={`hscroll`} onScroll={() => onHScroll()}>
        {memberData && memberData.map((member, index) => (
          <div  className="sectionMemberGrid">
            <table className="table">
              <tr>
                <td>Member</td>
                <td>MemberDetails</td>
              </tr>
            <tr>
              <td>Member</td>
              <td>{member.id}</td>
            </tr>
            <tr>
          <td>Name</td>
          <td>{member.name}</td>
          </tr>
          <tr>
              <td>Gender</td>
              <td>{member.gender}</td>
          </tr>
          <tr>
              <td>Dob</td>
              <td>{member.dob}</td>
          </tr>
          </table>
          </div>
        ))}
      </div>
        </div>
     
    </>}
    </div>
    </>

    );
};

export default MemberDetails;



const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
 
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};
 
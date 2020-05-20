import React ,{ useState,useEffect} from 'react'
import { MDBContainer, MDBInput, MDBCard, MDBBtn } from 'mdbreact'
import {useSelector, useDispatch } from "react-redux";
import {create,update} from '../Actions/postMessages'



const initialFieldValues = {
  title: "",
  message: ""
}
function PostMessageForm(props) {

  const [values, setValues] = useState(initialFieldValues)

  const postMessagesList=useSelector((state)=>{

    return state.postMessage.list
  })

  const userId=useSelector((state)=>{
    return state.auth.user.id;
  })

  const dispatch = useDispatch()


  const handleInputChange = e => {
      const { name, value } = e.target
      setValues({
          ...values,
          [name]: value
      })
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.msgId === 0)
    
    dispatch(create( userId,values))
else
  
    dispatch(update(props.msgId, values))

    setValues(initialFieldValues)
    props.setMsgId(0)
   
  }

  useEffect(() => {
    if (props.msgId !== 0){
      const a=postMessagesList.find(data => data._id === props.msgId)
      
        setValues(a)
        
    }
    // eslint-disable-next-line 
}, [props.msgId])


  return (
    <React.Fragment>
      <MDBContainer >
        <MDBCard className="card-body" style={{ width: "29rem", marginTop: "0rem" }}>

          <form  onSubmit={handleSubmit} >
            <MDBInput type="textarea"  label="Title" rows="2" name="title" value={values.title}  required onChange={handleInputChange} />
            <MDBInput type="textarea" label="Message" rows="5" name="message" value={values.message} required onChange={handleInputChange} />
            <MDBBtn color="primary" type="submit">Submit</MDBBtn>
          </form>
        </MDBCard>



      </MDBContainer>


    </React.Fragment>


  )
}


export default  (PostMessageForm)
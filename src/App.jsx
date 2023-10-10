
import {Controller, useForm} from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

import './App.css'

function App() {
     const schema = yup.object().shape({
      receiver: yup.string().required("receiver is required"),
      subject: yup.string().required("subject is required"),
      content: yup.string().required("content is required"),
      file: yup
      .mixed()
      .test("validate-file","File format is invalid", function (value) {
        return ["image/jpeg", "image/png"].includes(value.type);
      })

     })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      receiver: "",
      subject: "",
      content: "",
      file: "",
    },
    resolver: yupResolver(schema),
  });


  const onSubmitFormCallback = (values) => {
    console.log("values", values);
  };

  console.log("errors", errors);

  return (
       <div>
        <h1>Form</h1>
        <form onSubmit={handleSubmit(onSubmitFormCallback)}>
          <Controller 
          name="receiver"
          control={control}
          render={({field}) => (
            <div>
               <input {...field} type='text' placeholder='Nguoi nhan' />
            </div>
          )} 
          />
           <Controller 
          name="subject"
          control={control}
          render={({field}) => (
            <div>
               <input {...field} type='text' placeholder='Chu de' />
            </div>
          )} 
          />
           <Controller 
          name="content"
          control={control}
          render={({field}) => (
            <div>
               <input {...field} type='text' placeholder='Noi dung' />
            </div>
          )} 
          />
          <Controller 
          name="file"
          control={control}
          render={({field}) => (
            <div>
               <input {...field} type='file' value={field.value?.fileName} placeholder='Upload File'
               onChange={(event) => {
                field.onChange(event.target.files[0]);
               }} />
               <div>{errors?.file?.message}</div>
            </div>
          )} 
          />
          <button type='submit'>Submit</button>
          </form>
       </div>
  )
}


export default App

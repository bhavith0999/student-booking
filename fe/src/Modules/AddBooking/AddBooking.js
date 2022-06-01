import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddBooking.css'
import UserService from '../../Services/user.service';
import { Calendar } from 'primereact/calendar';
import Header from '../Header/Header';
import { Chips } from 'primereact/chips';


const AddBooking = (props) => {

    const { register, handleSubmit, formState: { errors }, reset, watch, getValues } = useForm();

    const [courses, setCourses] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCourses();
        getLocations();
    }, []);

   useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if(name == 'course' || name == 'location') {
                console.log(value)
               if(value?.course && value?.location) {
                   getTrainers(value?.course, value?.location)
               }else {
                   setTrainers([]);
               }
            }
        });
        return () => subscription.unsubscribe();
      }, [watch]);

    const getCourses = async () => {
        try {
            const res = await UserService.getCourses();
            setCourses(res?.data || []);
        } catch (error) {
            console.log(error);
        }
    }

    const getTrainers = async (cValue,lValue ) => {
        try {
            if(cValue && lValue) {
                const res = await UserService.getTrainersByTopic(JSON.parse(cValue)?.topic, JSON.parse(lValue)?.wheelchairAccessible);
                setTrainers(res?.data || []);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getLocations = async () => {
        try {
            const res = await UserService.getLocations();
            setLocations(res.data || []);
        } catch (error) {
            console.log(error);
        }
    }


    const save = async (data) => {
        try {
            await UserService.createBooking({...data, course: JSON.parse(data?.course)?._id,
                location: JSON.parse(data?.location)?._id, students });
            reset();
            props.showSuccess({ message: 'Successfully Updated', detail: 'Add Booking Screen' });
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <div className="page-content">
                <div className='container'>
                    <div style={{ borderBottom: '1px solid rgb(237, 242, 249)' }} className='d-flex align-items-center my-6'>
                        <div style={{ height: '25px', width: '12px', background: '#000', marginRight: '12px', borderRadius: '3px' }}></div>
                        <p className='m-0' style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>{ 'Add '} Booking</p>
                    </div>
                    <form onSubmit={handleSubmit(save)}>
                        <div className='row'>
                            <div className='col-md-6 mt-4'>
                                <div className="form-group">
                                    <label className="form-label">
                                        Course
                                    </label> <br />
                                    <select className='form-control'  {...register("course", {
                                        required: 'Required Input',
                                    })} >
                                        <option value={''}>Select One</option>
                                        {
                                            courses.length > 0 && courses.map(t => (
                                                <option key={t?._id} value={JSON.stringify(t)}>{t?.name}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors?.course && (
                                            <small className='text-danger mt-3 ms-3'>{errors?.course?.message}</small>
                                        )
                                    }

                                </div>
                            </div>


                            <div className='col-md-6 mt-4'>
                                <div className="form-group">
                                    <label className="form-label">
                                        Location
                                    </label> <br />
                                    <select className='form-control'  {...register("location", {
                                        required: 'Required Input',
                                    })}>
                                        <option value={''}>Select One</option>
                                        {
                                            locations.length > 0 && locations.map(t => (
                                                <option key={t?._id} value={JSON.stringify(t)}>{t?.name}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors?.location && (
                                            <small className='text-danger mt-3 ms-3'>{errors?.location?.message}</small>
                                        )
                                    }

                                </div>
                            </div>

                            <div className='col-md-6 mt-4'>
                                <div className="form-group">
                                    <label className="form-label">
                                        Trainer
                                    </label> <br />
                                    <select className='form-control'  {...register("trainer", {
                                        required: 'Required Input',
                                    })}>
                                        <option value={''}>Select One</option>
                                        {
                                            trainers.length > 0 && trainers.map(t => (
                                                <option key={t?._id} value={t?._id}>{t?.firstName} {t?.lastName}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors?.trainer && (
                                            <small className='text-danger mt-3 ms-3'>{errors?.trainer?.message}</small>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='col-md-6 mt-4'>
                                <div className="form-group">
                                    <label className="form-label">
                                        Booking Comments
                                    </label> <br />
                                    <textarea className='form-control' {...register("comments")} style={{ minHeight: '38px', height: '38px' }}></textarea>
                                </div>
                            </div>
                            <div className='col-md-12 mt-4'>
                                <div className='form-group'>
                                    <label className='form-label'>
                                        List of Students
                                    </label> <br />
                                    <Chips style={{width: '100%'}} value={students} onChange={(e) => {
                                        debugger;
                                        if(Array.isArray(e.value) && e.value.length) {
                                            const valueArray = [...e.value];
                                            const value = valueArray.pop();
                                            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                                                if(!valueArray.length || !valueArray.some(q => q === value)) {
                                                   
                                                    setStudents(e.value);
                                                }
                                            }else {
                                                setStudents(valueArray)
                                            }
                                        }else {
                                            setStudents(e.value)
                                        }
                                    }
                                    } />
                                    <br />
                                    
                                </div>
                            </div>
                            <div className='col-md-6 mt-4'>
                                <div className='form-group'>
                                    <label className='form-label'>
                                        Start Date
                                    </label> <br />
                                    <Calendar style={{ width: '100%', height: ' 40.5px' }} {...register("startDate", {
                                        required: 'Required Input',

                                    })}></Calendar> <br />
                                    {
                                        errors?.startDate && (
                                            <small className='text-danger mt-3 ms-3'>{errors?.startDate?.message}</small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='col-md-6 mt-4'>
                                <div className='form-group'>
                                    <label className='form-label'>
                                        End Date
                                    </label> <br />
                                    <Calendar style={{ width: '100%', height: ' 40.5px' }} {...register("endDate", {
                                        required: 'Required Input',

                                    })}></Calendar> <br />
                                    {
                                        errors?.endDate && (
                                            <small className='text-danger mt-3 ms-3'>{errors?.endDate?.message}</small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className="form-check mb-4" >
                                    <input className="form-check-input"
                                        {
                                        ...register('certificateRequired')
                                        }
                                        id="certificate-needed"
                                        type="checkbox" />
                                    <label className="form-check-label" htmlFor={"certificate-needed"}>Certificate Required</label>
                                </div>
                            </div>



                        </div>
                        <button className='btn btn-primary mt-2' type='submit'>{'Save'} Changes</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddBooking

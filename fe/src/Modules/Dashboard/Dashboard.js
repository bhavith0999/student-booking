import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { FiLogOut, FiEdit, FiEye, FiTrash } from 'react-icons/fi'
import { FaSearch } from 'react-icons/fa'
import UserService from '../../Services/user.service'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import moment from 'moment'
import Header from '../Header/Header'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const Dashboard = (props) => {

    const history = useNavigate();
    const [displayInfo, setDisplayInfo] = useState('');
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');

    const [data, setData] = useState([]);

    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2['global'].value = value;
        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    }

    const [filters2, setFilters2] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {
        try {
            const res = await UserService.getBookings();
            console.log(res?.data);
            setData(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2}
                        style={{ width: '70vw' }} onChange={onGlobalFilterChange2}
                        placeholder="Search using Booking Id, Course, Location, Trainer" />
                </span>
            </div>
        )
    }
    return (
        <>
            <Header />
            <div className="page-content">
                <div className="container-fluid">
                    <div className='container p-0'>
                        <div className='mt-6 ' style={{ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px', borderBottomRightRadius: '7px', borderTopRightRadius: '7px', boxShadow: '0 0.75rem 1.5rem rgb(18 38 63 / 3%)', border: '1px solid #edf2f9', backgroundColor: '#fff' }}>
                            <div className=' d-flex justify-content-between align-items-center' style={{ padding: '12px 24px' }}>
                                <div style={{ borderBottom: '1px solid rgb(237, 242, 249)' }} className='d-flex align-items-center'>
                                    <div style={{ height: '25px', width: '12px', background: '#000', marginRight: '12px', borderRadius: '3px' }}></div>
                                    <p className='m-0' style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>Upcoming Bookings</p>
                                </div>
                                <button className='btn btn-primary' onClick={() => history('/add-booking')}>+ Add Booking</button>
                            </div>
                            <div>
                                <DataTable
                                    header={renderHeader}
                                    filters={filters2}
                                    value={data} paginator responsiveLayout="scroll"
                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
                                    <Column sortable field='_id' header="Booking  Id" />
                                    <Column sortable field="course.name" header="Course" />
                                    <Column sortable field="location.name" header="Location" />
                                    <Column sortable header="Students Count" body={(dataRow) => <span style={{ color: 'green', textAlign: 'center' }}>{dataRow?.students.length}</span>} />
                                    <Column sortable header="Trainer" body={(dataRow) => <span>{dataRow?.trainer?.firstName} {dataRow?.trainer?.lastName} </span>} />
                                    {/* <Column sortable field="email" header="Email Address" /> */}
                                    <Column sortable body={(dataRow) => moment(dataRow?.startDate).format('DD MMM YYYY')} header="Start Date" />
                                    <Column sortable body={(dataRow) => moment(dataRow?.endDate).format('DD MMM YYYY')} header="End Date" />
                                    <Column body={(dataRow) => (<div className='d-flex'>
                                        <FiEye size={25} color='green' style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => setDisplayInfo(dataRow)} />
                                    </div>)} header="Action" />
                                </DataTable>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Dialog header="student booking info" visible={!!displayInfo} style={{ width: '50vw' }} onHide={() => setDisplayInfo('')}>
                <div className='row'>
                    <div className='col-md-5'>
                        <h6>Booking Id</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {displayInfo?._id}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <h6>Course</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {displayInfo?.course?.name}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <h6>Location</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {displayInfo?.location?.name}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <h6>Trainer</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {displayInfo?.trainer?.firstName} {displayInfo?.trainer?.lastName}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <h6>Start Date</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {moment(displayInfo?.startDate).format('DD/MM/YYYY')}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-5'>
                        <h6>End Date</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {moment(displayInfo?.endDate).format('DD/MM/YYYY')}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <h6>Certificate Required</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {displayInfo?.certificateRequired ? 'Required' : 'Not Required'}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <h6>Students</h6>
                    </div>
                    <div className='col-md-7'>
                        <p>: {(displayInfo?.students || []).map(q => (
                            <p key={q}><span>Email Address</span>: <span style={{ color: 'green' }}> {q}</span></p>
                        ))}</p>
                    </div>
                </div>

            </Dialog>
        </>
    )
}

export default Dashboard

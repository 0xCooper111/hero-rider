import React, { useContext, useState } from 'react';
import inputStyle from '../input.module.css';
import { useForm } from 'react-hook-form';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import postData from '../../../hooks/postData';
import PrimaryButton from '../../Button/Primary-Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { createRfcTime } from '../../../hooks/rfc.time.format';
import { UserData } from '../../../context/User.Context';

function SignIn() {

    const [visibleBool, setVisibleBool] = useState(false);

    const {userActiveData,load,setUserActiveData} = useContext(UserData);

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    if(load) return;

    console.log(userActiveData)

    if(userActiveData) return <Navigate to={`/`} replace={true}></Navigate>;

    const onSubmit = async (data) => {
        try {
            const userInfo = await postData(`/login`,data);
            document.cookie =`auth_jwt=Bearer ${userInfo.authroizationToken}; expire=${createRfcTime(30)} path=/`;
            return setUserActiveData(userInfo)

        } catch (error) {
            console.log(error.response.data.message)
        }
    };

    return (
        <section className={`flex justify-center items-center min-h-screen`}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={`my-2`}>
                    <label className={inputStyle[`input-label`]}>Full Name</label>
                    <input placeholder={`Enter Your Full Name`} type={'text'} className={inputStyle[`input-feild`]} {...register(`fullName`,)} required={true} />
                </div>

                <div className={`my-2`}>
                    <label className={inputStyle[`input-label`]}>Email</label>
                    <input placeholder={`Enter Your Email`} type={'email'} className={inputStyle[`input-feild`]} {...register(`email`,)} required={true} />
                </div>

                <div className={`my-2`}>
                    <label className={inputStyle[`input-label`]}>Password</label>
                    <div className={`relative`}>
                        <input placeholder={`Enter Your Password`} type={visibleBool ? 'text' : 'password'} className={inputStyle[`input-feild`]} {...register('password',)} minLength='6' required={true} />

                        <div onClick={() => setVisibleBool(!visibleBool)} className={`absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2`}>
                            {
                                visibleBool
                                    ?
                                    <IoIosEyeOff size={18} />
                                    :
                                    <IoIosEye size={18} />
                            }
                        </div>

                    </div>

                </div>

                <div className={`my-2`}>
                    <PrimaryButton middle={true}>LOG IN</PrimaryButton>
                </div>

            </form>
        </section>
    );
};

SignIn.propTypes = {}
export default SignIn;
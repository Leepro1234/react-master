import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

interface IForm {
  email: string
  firstName: string
  lastName: string
  password1: string
  password2: string

  errors: {
    email?: {
      message: string
    }
    firstName?: {
      message: string
    }
    lastName?: {
      message: string
    }
    password1?: {
      message: string
    }
    password2?: {
      message: string
    }
  }
  extraError?: string
}
function ToDoList() {
  const {
    register, //Input 이벤트 포함
    handleSubmit, //onSubmit이벤트, 유효성체크 포함
    formState: { errors }, //from state
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  })
  const onValid = (data: IForm) => {
    if (data.password1 !== data.password2) {
      setError(
        'password2',
        { message: '패스워드가 일치하지 않습니다.' },
        { shouldFocus: true }
      )
    }
    // setError('extraError', { message: '일시적으로 오류가 발생하였습니다.' })

    console.log(data)
  }
  console.log(errors)

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        //submit시 유효성 체크를 위해 사용
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            //input의 이름
            required: 'email은 필수입니다.', //필수일때 에러메시지. 이걸 해줘야 erros.email.message객체가 생김 아니면 error.email.reuired로 나옴
            pattern: {
              value: /^[A-Za-z0-9._%+=]+@naver.com$/, //naver.com 패턴인지 확인
              message: 'naver주소만 허용됩니다.',
            },
          })}
          placeholder="Email"
        />
        <span style={{ color: 'white' }}>
          {errors?.email?.message as string}
        </span>
        <input
          {...register('firstName', { required: '성을입력해주세요' })}
          placeholder="FirstName"
        />
        <span style={{ color: 'white' }}>
          {errors?.firstName?.message as string}
        </span>
        <input
          {...register('lastName', {
            required: '이름을 입력해주세요',
            validate: {
              //유효성 체크를 여러개 줄수 있음
              noMaverick: value =>
                value.includes('maverick')
                  ? 'maverick은 사용할 수 없습니다.'
                  : true,
              noMask: value =>
                value.includes('mask') ? 'mask는 사용할 수 없습니다.' : true,
            },
          })}
          placeholder="LastName"
        />
        <span style={{ color: 'white' }}>
          {errors?.lastName?.message as string}
        </span>

        <input
          {...register('password1', {
            required: '비밀번호를 입력해주세요',
            minLength: { value: 5, message: '10글자 이상 입력해주세요' },
          })}
          placeholder="Password1"
        />
        <span style={{ color: 'white' }}>
          {errors?.password1?.message as string}
        </span>
        <input
          {...register('password2', {
            required: '비밀번호2를 입력해주세요',
            minLength: { value: 5, message: '10글자 이상 입력해주세요' },
          })}
          placeholder="Password2"
        />
        <span style={{ color: 'white' }}>
          {errors?.password2?.message as string}
        </span>
        <button>Add</button>
        <span style={{ color: 'white' }}>
          {errors?.extraError?.message as string}
        </span>
      </form>
    </div>
  )
}

export default ToDoList

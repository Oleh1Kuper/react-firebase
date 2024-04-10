import React, { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Link, useLocation } from 'react-router-dom';
import { Button, Flex, Spinner, Text, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser, registerUser } from '../services/authentication';

export type FormData = {
  name?: string;
  email: string;
  password: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoad, setIsload] = useState(false);

  const { pathname } = useLocation();
  const isRegisterPage = pathname.includes('register');

  const onSubmit = async (data: FormData) => {
    setIsload(true);

    try {
      const response = isRegisterPage
        ? await registerUser(data)
        : await loginUser(data);

      if (response.success) {
        toast.success(`${response.message}`, {
          position: 'top-center',
        });
      } else {
        toast.error(`${response.message}`, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
      });
    } finally {
      setIsload(false);
    }

    // reset();
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="2" direction="column">
          {isRegisterPage && (
            <>
              <Label.Root className="LabelRoot">Name</Label.Root>
              <TextField.Root
                className=" outline-[#171717]"
                variant="surface"
                radius="none"
                size="3"
                placeholder="Name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
              {errors.name?.message && (
                <Text className="text-xs text-red-600">
                  {errors.name.message}
                </Text>
              )}
            </>
          )}

          <Label.Root className="LabelRoot">Email</Label.Root>
          <TextField.Root
            className="outline-[#171717]"
            variant="surface"
            radius="none"
            size="3"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email?.message && (
            <Text className="text-xs text-red-600">{errors.email.message}</Text>
          )}

          <Label.Root className="LabelRoot">Password</Label.Root>
          <TextField.Root
            className=" outline-[#171717]"
            radius="none"
            variant="surface"
            size="3"
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password?.message && (
            <Text as="span" className="text-xs text-red-600">
              {errors.password.message}
            </Text>
          )}

          <Button
            size="3"
            radius="none"
            className="mt-2 cursor-pointer bg-[#171717] uppercase"
            type="submit"
            loading={isLoad}
            disabled={isLoad}
          >
            {isRegisterPage ? 'Register' : 'Login'}
            {isLoad && <Spinner />}
          </Button>

          <Link
            className="mt-2 underline"
            to={isRegisterPage ? '/' : '/register'}
          >
            {isRegisterPage
              ? 'Already a member? Click here to login'
              : 'Not a member? Click here to register'}
          </Link>
        </Flex>
      </form>
    </>
  );
};

export default Form;

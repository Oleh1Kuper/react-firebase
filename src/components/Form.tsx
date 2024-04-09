import React from 'react';
import * as Label from '@radix-ui/react-label';
import { Link, useLocation } from 'react-router-dom';
import { Button, Flex, Text, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { pathname } = useLocation();
  const isRegisterPage = pathname.includes('register');

  const onSubmit = (data: FormData) => {
    console.log(data);

    reset();
  };

  return (
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
              {...register('name')}
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
          {...register('email')}
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
          {...register('password')}
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
        >
          Login
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
  );
};

export default Form;

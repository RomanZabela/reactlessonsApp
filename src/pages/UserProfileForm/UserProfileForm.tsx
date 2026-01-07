import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import './UserProfileForm.css';

const formSchema = z
    .object({
        firstName: z.string().min(2, 'First name is required'),
        lastName: z.string().min(2, 'Last name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters long'),
        confirmPassword: z.string().min(8, 'Please confirm your password'),
        age: z.number().min(18, 'You must be at least 18 years old'),
        gender: z.enum(['male', 'female', 'other'], 'Please select'),
        country: z.string().min(1, 'Select a country'),
        bio: z.string().max(300).optional(),
        newsletter: z.boolean(),
        experience: z.number(),
        terms: z.literal(true).refine((val) => val === true, {
            message: 'You must accept the terms and conditions',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

type FormData = z.infer<typeof formSchema>;

const STORAGE_KEY = 'user-form-cache';

export const UserProfileForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
        defaultValues: (() => {
            const storedData = typeof window !== 'undefined'
                ? localStorage.getItem(STORAGE_KEY)
                : null;

            if (storedData) {
                try {
                const parsedData = JSON.parse(storedData);
                    return {
                        ...parsedData,
                        newsletter: false,
                        experience: 3,
                        terms: false,
                    };
                } catch {
                    return {
                        newsletter: false,
                        experience: 3,
                        terms: false,
                    };
                }
            }
            return {
                newsletter: false,
                experience: 3,
                terms: false,
            };
        })(),
    });

    useEffect(() => {
        const subscription = watch((data) => {
            const { password, confirmPassword, ...safeData } = data;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        localStorage.removeItem(STORAGE_KEY);
        reset();
        console.log('Form submitted:', data);
    };

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>User Profile</h2>

            <FormField label='First Name' error={errors.firstName?.message}>
                <input {...register('firstName')} />
            </FormField>

            <FormField label='Last Name' error={errors.lastName?.message}>
                <input {...register('lastName')} />
            </FormField>

            <FormField label='Email' error={errors.email?.message}>
                <input type='email' {...register('email')} />
            </FormField>

            <FormField label='Password' error={errors.password?.message}>
                <input type='password' {...register('password')} />
            </FormField>

            <FormField label='Confirm Password' error={errors.confirmPassword?.message}>
                <input type='password' {...register('confirmPassword')} />
            </FormField>

            <FormField label='Age' error={errors.age?.message}>
                <input type='number' {...register('age', { valueAsNumber: true })} />
            </FormField>

            <fieldset className='fieldset'>
                <legend>Gender</legend>

                <div className='radioCards'>
                    <label className='radioCard'>
                        <input type='radio' value='male' {...register('gender')} />
                        <span className='cardContent'>
                            <span className='icon'>👨</span>
                            <span className='text'>Male</span>
                            <span className='check' aria-hidden="true"> ✓</span>
                        </span>
                    </label>
                    <label className='radioCard'>
                        <input type='radio' value='female' {...register('gender')} />
                        <span className='cardContent'>
                            <span className='icon'>👩</span>
                            <span className='text'>Female</span>
                            <span className='check' aria-hidden="true"> ✓</span>
                        </span>
                    </label>
                    <label className='radioCard'>
                        <input type='radio' value='other' {...register('gender')} />
                        <span className='cardContent'>
                            <span className='icon'>🧑</span>
                            <span className='text'>Other</span>
                            <span className='check' aria-hidden="true"> ✓</span>
                        </span>
                    </label>
                    {errors.gender && (
                        <p className='error' role='alert'>{errors.gender.message}</p>
                    )}
                </div>
            </fieldset>

            <FormField label='Country' error={errors.country?.message}>
                <select {...register('country')}>
                    <option value=''>Select country</option>
                    <option value='us'>United States</option>
                    <option value='il'>Israel</option>
                    <option value='uk'>United Kingdom</option>
                </select>
            </FormField>

            <FormField label='Bio' error={errors.bio?.message}>
                <textarea {...register('bio')} />
            </FormField>

            <label className='range'>
                Experience Level: {watch('experience')}
                <input
                    type='range'
                    min={1}
                    max={10}
                    {...register('experience', { valueAsNumber: true })}
                />
            </label>

            <label className='checkbox'>
                <input type='checkbox' {...register('newsletter')} />
                Subscribe to newsletter
            </label>

            <label className='checkbox'>
                <input type='checkbox' {...register('terms')} />
                I accept the terms and conditions
            </label>
            {errors.terms && (
                <p className='error' role='alert'>{errors.terms.message}</p>
            )}

            <button type='submit' disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )

}

function FormField({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label className='field'>
            <span>{label}</span>
            {children}
            {error && (
                <p className='error' role='alert'>
                {error}
                </p>
            )}
        </label>
    );
}
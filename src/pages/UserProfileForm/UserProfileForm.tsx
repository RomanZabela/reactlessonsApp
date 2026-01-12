import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import './UserProfileForm.css';
import { useThemeStore } from '../../shared/stores/useThemeStore';
import { useTranslation } from 'react-i18next';

const formSchema = z
    .object({
        firstName: z.string().min(2, 'First name is required'),
        lastName: z.string().min(2, 'Last name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters long'),
        confirmPassword: z.string().min(8, 'Please confirm your password'),
        age: z.number().min(18, 'You must be at least 18 years old'),
        gender: z.enum(['male', 'female', 'other'], {message: 'Please select'}),
        country: z.string().min(1, 'Select a country'),
        bio: z.string().max(300).optional(),
        newsletter: z.boolean(),
        experience: z.number(),
        terms: z.boolean().refine((val) => val === true, {
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
    const { theme } = useThemeStore();
    const isDark = theme === 'lara-dark-blue';
    const { t } = useTranslation('common');

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
        console.log('Form submitted:', data);
        reset();
    };

    return (
        <form className={'form' + (isDark ? ' dark' : '')} onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>{t('common:userProfile.title')}</h2>

            <FormField label={t('common:userProfile.fields.firstName')} error={errors.firstName ? t('common:userProfile.errors.firstNameRequired') : undefined} required>
                <input {...register('firstName')} />
            </FormField>

            <FormField label={t('common:userProfile.fields.lastName')} error={errors.lastName ? t('common:userProfile.errors.lastNameRequired') : undefined} required>
                <input {...register('lastName')} />
            </FormField>

            <FormField label={t('common:userProfile.fields.email')} error={errors.email ? t('common:userProfile.errors.invalidEmail') : undefined} required>
                <input type='email' {...register('email')} />
            </FormField>

            <FormField label={t('common:userProfile.fields.password')} error={errors.password ? t('common:userProfile.errors.passwordRequired') : undefined} required>
                <input type='password' {...register('password')} />
            </FormField>

            <FormField label={t('common:userProfile.fields.confirmPassword')} error={errors.confirmPassword ? t('common:userProfile.errors.passwordsMismatch') : undefined} required>
                <input type='password' {...register('confirmPassword')} />
            </FormField>

            <FormField label={t('common:userProfile.fields.age')} error={errors.age ? t('common:userProfile.errors.ageMinimum') : undefined}>
                <input type='number' {...register('age', { valueAsNumber: true })} />
            </FormField>

            <fieldset className='fieldset'>
                <legend>{t('common:userProfile.fields.gender')}</legend>

                <div className='radioCards'>
                    <label className='radioCard'>
                        <input type='radio' value='male' {...register('gender')} />
                        <span className='cardContent'>
                            <span className='icon'>👨</span>
                            <span className='text'>{t('common:userProfile.genderOptions.male')}</span>
                            <span className='check' aria-hidden="true">✓</span>
                        </span>
                    </label>
                    <label className='radioCard'>
                        <input type='radio' value='female' {...register('gender')} />
                        <span className='cardContent'>
                            <span className='icon'>👩</span>
                            <span className='text'>{t('common:userProfile.genderOptions.female')}</span>
                            <span className='check' aria-hidden="true">✓</span>
                        </span>
                    </label>
                    <label className='radioCard'>
                        <input type='radio' value='other' {...register('gender')} />
                        <span className='cardContent'>
                            <span className='icon'>🧑</span>
                            <span className='text'>{t('common:userProfile.genderOptions.other')}</span>
                            <span className='check' aria-hidden="true">✓</span>
                        </span>
                    </label>
                    {errors.gender && (
                        <p className='error' role='alert'>{t('common:userProfile.errors.genderRequired')}</p>
                    )}
                </div>
            </fieldset>

            <FormField label={t('common:userProfile.fields.country')} error={errors.country ? t('common:userProfile.errors.countryRequired') : undefined}>
                <select {...register('country')}>
                    <option value=''>{t('common:userProfile.countryOptions.placeholder')}</option>
                    <option value='us'>{t('common:userProfile.countryOptions.us')}</option>
                    <option value='il'>{t('common:userProfile.countryOptions.il')}</option>
                    <option value='uk'>{t('common:userProfile.countryOptions.uk')}</option>
                </select>
            </FormField>

            <FormField label={t('common:userProfile.fields.bio')} error={errors.bio ? t('common:userProfile.errors.bioRequired') : undefined}>
                <textarea {...register('bio')} />
            </FormField>

            <label className='range'>
                {t('common:userProfile.fields.experienceLevel')}: {watch('experience')}
                <input
                    type='range'
                    min={1}
                    max={10}
                    {...register('experience', { valueAsNumber: true })}
                />
            </label>

            <label className='checkbox'>
                <input type='checkbox' {...register('newsletter')} />
                {t('common:userProfile.fields.newsletter')}
            </label>

            <label className='checkbox'>
                <input type='checkbox' {...register('terms')} />
                {t('common:userProfile.fields.terms')}
            </label>
            {errors.terms && (
                <p className='error' role='alert'>{t('common:userProfile.errors.termsRequired')}</p>
            )}

            <button type='submit' className='submit' disabled={!isValid || isSubmitting}>
                {isSubmitting ? t('common:userProfile.button.submitting') : t('common:userProfile.button.submit')}
            </button>
        </form>
    );
}

function FormField({
    label,
    error,
    children,
    required,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label className='field'>
            <span>
                {label}{required && <span className='required'> *</span>}
            </span>
            {children}
            {error && (
                <p className='error' role='alert'>
                {error}
                </p>
            )}
        </label>
    );
}
import { createContext, useContext } from 'react';
import { useSubmit } from "react-router-dom";
import { useForm, UseFormRegister, FieldErrors, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import type { HTMLFormMethod } from "@types/react-router-dom";
import { Button } from './button';
import { Input as InputField } from './input';
const FormContext = createContext<{
  register: UseFormRegister<{ [name: string]: any }>,
  errors: FieldErrors<{ [name: string]: any }>
} | null>(null);
export function Form({ schema, children, method }: { schema: any, children: any, method: HTMLFormMethod }) {
  const submit = useSubmit();
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<{ [name: string]: any }> = data => {
    submit(data, {
      method,
      encType: "application/json"
    })
  }
  return <FormContext.Provider value={{ register, errors }}>
    <form onSubmit={handleSubmit(onSubmit)} className='w-full sm:w-60 mt-8 flex flex-col'>
      {children}
    </form>
  </FormContext.Provider>
}
export function Input({ label, name, type: _type }: { label: string, name: string, type: string }) {
  const ctx = useContext(FormContext);
  const register = ctx?.register || (() => null)
  const errors = ctx?.errors || {}
  const styles = [
    "mt-1",
    "w-full",
    "rounded-md",
    "border-gray-200",
    "bg-white",
    "text-sm",
    "text-gray-700",
    "shadow-sm",
    "p-3",
    "outline outline-offset-2 outline-1"
  ].reduce((p: string, c: string) => p.concat(' ', c))
  return <div className="my-1 w-full flex flex-col">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
    <InputField className={`${styles}`} {...register(name)} type={_type} />
    <span className="text-red-500 w-full min-h-6">{errors[name]?.message as string}</span>
  </div>
}

export function Submit({ children, className, ...props }: { children: any, className: string }) {
  const styles = [
    "inline-block",
    "shrink-0",
    "rounded-md",
    "border",
    "border-blue-600",
    "bg-blue-600",
    "px-12",
    "py-3",
    "text-sm",
    "font-medium",
    "text-white",
    "transition",
    "hover:bg-transparent",
    "hover:text-blue-600",
    "focus:outline-none",
    "focus:ring",
    "active:text-blue-500",
  ].reduce((prev: string, curr: string) => prev.concat(' ', curr))
  return <div className="w-full">
    <Button type="submit" {...props} className={`${styles} ${className}`}> {children}</ Button>
  </div>
}

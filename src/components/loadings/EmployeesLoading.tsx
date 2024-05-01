import React from 'react'
import EmployeeLoading from './items/EmployeeLoading'

export default function EmployeesLoading() {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 auto-rows-auto lg:gap-8 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <EmployeeLoading key={index} />
            ))}
        </div>
    )
}

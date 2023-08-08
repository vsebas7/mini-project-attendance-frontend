import { useNavigate } from "react-router-dom"

function EmployeeListCard ({
    id ="",
    username ="",
    email="",
    phone="",
    dob="",
    shiftStart="",
    shiftEnd="",
    salaryMonth="",
}) {
    const navigate = useNavigate()
    return (
        <tbody>
            <tr class="bg-white text-left border-b bg-blue dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    <button onClick={()=>{navigate(`/employee/detail/${id}`,"replace")}} >
                        {username}
                    </button>
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {email}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {phone}
                </th> 
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {dob}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {shiftStart}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {shiftEnd}
                </th>                
                <th className="hidden" scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {new Intl.NumberFormat().format(salaryMonth)}
                </th>
            </tr>
        </tbody>
    )
}

export default function RenderEmployeeListCard ({
    employee = []
}) {
    return employee.map((employee, index) => {
        return (
            <EmployeeListCard key={employee.id}
                id={employee.id}
                username={employee.username}
                email={employee.email}
                phone={employee.phone}
                dob={employee.dob}
                shiftStart={employee.shift_hour.start}
                shiftEnd={employee.shift_hour.end}
                salaryMonth={employee.salary.salary}
            />
        )
    })
}
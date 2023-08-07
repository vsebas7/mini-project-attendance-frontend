function AttendanceListCard ({
    day ="",
    clockIn="",
    clockOut="",
    salary="",
}) {
    return (
        <tbody>
            <tr class="bg-white text-left border-b bg-blue dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {day}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {clockIn}
                </th>
                <th scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {clockOut}
                </th>                
                <th className="hidden" scope="row" class="px-6 py-4  font-medium text-gray-900  dark:text-white">
                    {new Intl.NumberFormat().format(salary)}
                </th>
            </tr>
        </tbody>
    )
}

export default function RenderAttendanceListCard ({
    attendance = []
}) {
    return attendance.map((attendance, index) => {
        return (
            <AttendanceListCard key={attendance.id}
                day={attendance.date}
                clockIn={attendance.clock_in}
                clockOut={attendance.clock_out}
                salary={attendance.salary}
            />
        )
    })
}
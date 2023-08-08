function ShiftList ({
    id = "",
    start = "",
}) {
    return (
        <option selected={id===1}className={id.toString()} value={start}>{start}</option>
    )
}


export function RenderShiftList ({
    list = [],
}) {
    return list.map((list, index) => {
        return (
            <ShiftList key={list.id}
                id={list.id}
                start={list.start}
            />
        )
    })
}
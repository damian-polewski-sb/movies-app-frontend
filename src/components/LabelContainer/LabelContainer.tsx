const LabelContainer: React.FC<{ arr: any[], label: string }> = ({arr, label}) => {
    return (
        <div className="flex flex-col gap-1 text-white">
            <span className="mx-2 font-semibold text-gray-300 text-md">{ label }</span>
            <div className='p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg'>
                <div className="flex flex-wrap justify-between gap-2">
                    {arr.map((element: any) => (
                        <img className='object-cover w-[calc(25%-0.5rem)] overflow-hidden rounded' src={element.poster} alt={element.title} key={element.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LabelContainer
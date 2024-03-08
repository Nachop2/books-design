import { useDrag, useDrop } from 'react-dnd';
import { useState } from "react";

const PetCard = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'pet',
        item: { id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div className='pet-card' ref={dragRef}>
            {name}
            {isDragging && '😱'}
        </div>
    )
}

const PETS = [
    { id: 1, name: 'dog' },
    { id: 2, name: 'cat' },
    { id: 3, name: 'fish' },
    { id: 4, name: 'hamster' },
]

const DragAndDrop = () => {
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'pet',
        drop: (item) => setBasket((basket) =>
            !basket.includes(item) ? [...basket, item] : basket),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <div className="d-flex">
            <div className="border border-dark">
                {PETS.map(pet => <PetCard draggable id={pet.id} name={pet.name} />)}
            </div>
            <div className="border border-dark" ref={dropRef}>
                <p>Drop area</p>
                {basket.map(pet => <PetCard id={pet.id} name={pet.name} />)}
                {isOver && <p>Drop Here!</p>}
            </div>
        </div>
    )
}

export default DragAndDrop;
const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid*2}px 0`,

    // change background colour if dragging
    background: isDragging ? '#2185d0' : '',
    color: isDragging ? '#fff' : '',

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#f3f3f3' : '',
    padding: '10px 20px',
    height: '100%'
});

export const truncateString = (stringToBeTruncated, length) => {
    return stringToBeTruncated.length > length ? stringToBeTruncated.substring(0,length)+'...' : stringToBeTruncated;
}
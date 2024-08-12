/**
 * Componente para visualizar el item.
 */
function DataItem({item}) {
    return (
    <div>
        <h4>{item.nombre} (id {item.id})</h4>
    </div>);
}

export default DataItem;

const YourComponent = () => {
    const firstName = "Dang"
    const renderObject = {
        name: "Mai Phuong",
        age: 18
    }
    return (
        <>
            <h4>{firstName} Cong Duc</h4>
            <h6>{renderObject.name} La nguoi yeu cua toi</h6>
            <h6>Info my girl friend :  {JSON.stringify(renderObject)} </h6>
            <p className="sub-title" style={{ color: 'red' }}>This is used fragment tag</p>
        </>
    )
}

export default YourComponent;
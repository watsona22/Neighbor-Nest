import Home from "../components/HomepageBody";

const ItemPage = ({ name }) => {
    if (!items.length) {
        return <h3>No Profiles Yet</h3>;
    }

    return (
        <div>
            <h3 className="text-primary">{name}</h3>
            <div className="flex-row justify-space-between my-4">
                {items &&
                    items.map((items) => (
                        <div key={item._id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0">
                                    {item.name} <br />
                                    <span className="text-white" style={{ fontSize: '1rem' }}>
                                    </span>
                                </h4>

                                <Home
                                    className="btn btn-block btn-squared btn-light text-dark"
                                    to={`/profiles/${item._id}`}
                                >
                                </Home>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default ItemPage;

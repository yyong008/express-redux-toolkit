import { useGetNoStoreQuery, useSetNoStoreMutation } from "@/apis/nostore";
import { Link } from "react-router-dom";

function CreateItem() {
    const [updateNoStore, result] = useSetNoStoreMutation();

    const onSubmit = async (e) => {
        e.preventDefault();
        const { target } = e;
        await updateNoStore({
            a: target[0].value,
            b: target[1].value,
        }).unwrap();
    };

    return (
        <div className="flex flex-col shadow-md w-1/2 p-8 my-2 rounded-md space-y-4 outline outline-1 outline-cyan-500">
            <div className="space-y-4">
                <form
                    className="space-y-4"
                    name="f"
                    onSubmit={onSubmit}
                    encType="application/x-www-form-urlencoded"
                >
                    <input
                        className="w-full h-10 p-4 outline outline-1 outline-cyan-500  hover:outline-2 rounded-md"
                        name="username"
                        type="text"
                        placeholder="please input content"
                    />
                    <br />
                    <input
                        className="w-full h-10 p-4 outline outline-1 outline-cyan-500  hover:outline-2 rounded-md"
                        name="password"
                        type="password"
                        placeholder="please input content"
                    />
                    <br />
                    <button
                        className="px-4 py-2 font-semibold text-sm bg-whit  border-slate-300 rounded-md shadow-sm outline outline-1 outline-offset-2 outline-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
                        type="submit"
                    >
                        {!result.isLoading ? "Submit" : "loading..."}
                    </button>
                </form>
            </div>
        </div>
    );
}

function Nav() {
    return (
        <div className="space-x-4 pb-2 border-b-2 border-gray-100">
            <Link className="text-cyan-500 " to="/">HomePage</Link>
            <Link to="/about">AboutPage</Link>
            <Link to="/total">TotalPage</Link>
            <Link to="/todolist">TodoListPage</Link>
        </div>
    );
}
function App() {
    const { data, isFetching, isLoading, isError } = useGetNoStoreQuery("");
    console.log(data, isError);
    if (isError) {
        return <>error</>;
    }
    if (isFetching) {
        return <div>Fetching...</div>;
    }

    if (isLoading) {
        return <div>isLoading...</div>;
    }

    return (
        <div className="flex flex-col shadow-md w-1/2 p-8 mx-auto my-2 rounded-md space-y-4 outline outline-1 outline-cyan-500">
            <Nav />
            <div className="text-cyan-500">test：{JSON.stringify(data)}</div>
            <CreateItem />
        </div>
    );
}

export default App;

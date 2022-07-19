import { useGetNoStoreQuery, useSetNoStoreMutation } from "../../apis/nostore";

function App() {
    const { data, isFetching, isLoading, error } = useGetNoStoreQuery({});
    const [updateNoStore, result] = useSetNoStoreMutation();

    const onSubmit = async (e) => {
        e.preventDefault();
        const { target } = e;
        await updateNoStore({
            a: target[0].value,
            b: target[1].value,
        }).unwrap();
    };

    if (isFetching) {
        return <div>Fetching</div>;
    }

    if (isLoading) {
        return <div>isLoading</div>;
    }

    if (error) {
        return <>error</>;
    }

    return (
        <div className="flex flex-col shadow-md w-1/2 p-8 mx-auto my-2 rounded-md space-y-4 outline outline-1 outline-cyan-500">
            <div>test：{JSON.stringify(data)}</div>
            <div className="flex flex-col shadow-md w-1/2 p-8 mx-auto my-2 rounded-md space-y-4 outline outline-1 outline-cyan-500">
                <div className="space-y-4">
                    <form
                        className="space-y-4"
                        name="f"
                        onSubmit={onSubmit}
                        encType="application/x-www-form-urlencoded"
                    >
                        <input
                            className="outline outline-1 outline-cyan-500  hover:outline-dashed rounded-md"
                            name="username"
                            type="text"
                        />
                        <br />
                        <input
                            className="outline outline-1 outline-cyan-500  hover:outline-dashed rounded-md"
                            name="password"
                            type="password"
                        />
                        <br />
                        <button
                            className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm outline outline-2 outline-offset-2 outline-indigo-500 dark:bg-slate-700 dark:text-slate-200 dark:border-transparent"
                            type="submit"
                        >
                            {!result.isLoading ? "提交" : "loading..."}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;

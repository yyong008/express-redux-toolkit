import { Component } from "react";

import { connect } from "react-redux";

import { noStoreApi } from "@/apis/nostore"
import { QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";

interface AboutCompProps {
    getData: () => any;
    setData: (data: any) => any;
    data: any;
}
class AboutComp extends Component<AboutCompProps, any> {
    constructor(props: AboutCompProps) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        this.props.getData()
    }

    onSubmit(e) {
        e.preventDefault();
        const { target } = e;
        this.props.setData({
            a: target[0].value,
            b: target[1].value,
        });
    };
    render() {
        console.log(this.props)
        const { data } = this.props.data
        return <div className="flex flex-col shadow-md w-1/2 p-8 mx-auto my-2 rounded-md space-y-4 outline outline-1 outline-cyan-500">
            <div>test：{JSON.stringify(data)}</div>
            <div className="space-y-4">
                <form
                    className="space-y-4"
                    name="f"
                    onSubmit={this.onSubmit}
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
                        提交
                    </button>
                </form>
            </div>
        </div>
    }
}

const mapState = (state: RootState<{ getNoStore: QueryDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "NoStore", any, "api">; setNoStore: MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "NoStore", any, "api">; }, "NoStore", "api">) => {
    return {
        data: noStoreApi.endpoints.getNoStore.select("")(state)
    }
}

const mapDispatch = () => {
    return {
        getData: noStoreApi.endpoints.getNoStore.initiate,
        setData: noStoreApi.endpoints.setNoStore.initiate,
    }
}

export default connect(mapState, mapDispatch())(AboutComp)
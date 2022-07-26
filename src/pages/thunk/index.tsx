import type { FC } from "react";
import type { AppDispatch } from "@/store/index"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSliceInfo } from "@/apis/thunk";

const PageThunk: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state: any = useSelector((state) => state)

  useEffect(() => {
    dispatch(getSliceInfo());
  }, []);

  if (state.tSlice.isLoading) return <div>Loading...</div>
  return <div>PageThunk{JSON.stringify(state.tSlice)}</div>;
};

export default PageThunk;

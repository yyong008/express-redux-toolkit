import type { AppDispatch } from "@/store/index";

import { setupStore } from "@/store/index";

const dispatch = setupStore().dispatch;

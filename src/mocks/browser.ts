import { setupWorker } from 'msw/browser';
import { handlers } from "../features/auction/msw/handlers.ts";

export const worker = setupWorker(...handlers);
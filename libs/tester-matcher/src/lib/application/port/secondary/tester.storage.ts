import {InjectionToken} from "@angular/core";
import {ReplaySubject} from "rxjs";
import {TesterDTO} from "./tester.dto";

export type TesterStorage = ReplaySubject<TesterDTO>;

export const TESTER_STORAGE = new InjectionToken<TesterStorage>('TESTER_STORAGE');


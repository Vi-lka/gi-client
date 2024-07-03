'use client'

import React from 'react';
import { SWRConfig } from 'swr'
import request from "graphql-request";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (query: string, variables?: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    request(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, query, variables);

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SWRConfig
            value={{
                fetcher
            }}
        >
            {children}
        </SWRConfig>
    )
};
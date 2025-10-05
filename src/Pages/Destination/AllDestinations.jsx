import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '../../Hooks/Axios/AxiosInstance';

const AllDestinations = () => {

    const { data: destinations = [], isLoading, isError } = useQuery({
        queryKey: ["destinations"],
        queryFn: async () => {
            const { data } = await axiosInstance("/destinations")
            return data;
        }
    })
    if (isLoading) return <h3>loading....</h3>
    if (isError) return <h3>error....</h3>

    console.log("all data", destinations) 

    return (
        <div>
            <h1>This is All destinations Data</h1>
            <div className='grid grid-cols-3 gap-10'>
                {
                    destinations?.data?.map((place) => (
                        <div key={place._id}>
                            <h3>{place.title}</h3>
                            <p>Id:{place._id}</p>
                            <button className='btn btn-primary'>Details</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllDestinations;
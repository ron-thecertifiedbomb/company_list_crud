import React, {useState} from "react";
import { useGetListOfCompaniesQuery, useDeleteCompanyMutation } from "../pages/api/apiSlice";
import Link from "next/link";
import TableHead from "./TableHead";

const List = (): JSX.Element | null => {
  const { data: companies, isLoading, isSuccess, isError } = useGetListOfCompaniesQuery();

const [showModal, setShowModal] = useState('Johnston Group')

  
  const [deleteCompany] = useDeleteCompanyMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>There's an error</p>;
  }

  if (isSuccess) {
    return (
      <div className="max-w-[1300px] p-2 w-full mb-10 relative">
        <table className="w-full border-collapse block md:table">
          <TableHead />
          {companies?.map((company, index) => (
            <tbody className="block md:table-row-group" key={company.id}>
              <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                <td className="p-2 text-[14px] md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">No</span>
                  {index}
                </td>
                <td className="p-2 text-[15px] md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Company Name</span>
                  {company.name}
                </td>
                <td className="p-2 text-[15px] md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Address</span>
                  {company.address}
                </td>
                <td className="p-2 text-[15px] md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Contact Info</span>
                  {company.contactInfo}
                </td>
                <td className="p-2 text-[15px] md:border md:border-grey-500 text-center block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Government Registration</span>
                  {company.governmentRegistration}
                </td>
                <td className="p-2 text-[15px] md:border md:border-grey-500 text-center block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Date Created</span>
                  {new Date(company.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 text-[15px] md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Status</span>
                  {company.isActive ? 'Active' : 'Inactive'}
                </td>


                <td className="d-flex justify-center items-center p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                  <Link href={`/company/${company.id}`}>
                    <button className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                     <h1 className=" text-[12px]"> Edit</h1> 
                    </button>
                  </Link>
                 
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    onClick={() => setShowModal( company?.name)}
                  >
                     <h1 className=" text-[12px]"> Delete</h1> 
                  </button>
                </td>

{/* Modal */}
               
                <td className= { showModal === company.name ? "absolute  bg-blue-gray-800 w-[400px] h-[250px] top-10 right-[200px] pt-6 pl-9 pr-9 lg:top-10 lg:right-[450px] md:border md:border-grey-500 text-center block md:table-cell" : ''}>
                

                { showModal === company.name ? <h1 className=" font-semibold text-white"> Are you sure you want to Delete</h1> : ''}
                { showModal === company.name ? <h1 className=" font-semibold  text-white mt-2"> {company?.name}?</h1> : ''}

                  <button
                    className={showModal === company.name ? "bg-red-500 hover:bg-red-700 w-full mt-5 mb-7 text-white font-bold py-1 px-2 border border-red-500 rounded" : ''}
                    onClick={() => deleteCompany({ id: company.id })}
                  >
                    { showModal === company.name ? <h1> Yes</h1> : ''}
                  </button>

                  <button
                    className={showModal === company.name ? "bg-red-500 hover:bg-red-700 w-full text-white font-bold py-1 px-2 border border-red-500 rounded" : ''}
                    onClick={() => setShowModal('')}
                  >
                    { showModal === company.name ? <h1> Cancel</h1> : ''}
                  </button>
                </td>



              </tr>
            </tbody>
          ))}
        </table>
<br></br>
<div className="flex w-full justify-center ">
        <Link href={"/company/addcompany"}>
      <button className=" h-[40px] w-60 text-blue-gray-50 bg-green-400 rounded-lg">Add</button>
      </Link>
      </div>
      <br></br>

      </div>
    );

  }

  return null;
};

export default List;
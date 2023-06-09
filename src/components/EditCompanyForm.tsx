import React, { useState } from "react";
import {
  useGetCompanyDetailQuery,
  useUpdateCompanyMutation,
} from "../pages/api/apiSlice";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { increment } from "../store/reducer";

interface EditCompanyFormProps {}

const EditCompanyFormProps: React.FC<EditCompanyFormProps> = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const id =
    typeof router.query.id === "string"
      ? parseInt(router.query.id, 10)
      : undefined;

  const { data: company } = useGetCompanyDetailQuery(id);
  const [updateCompany] = useUpdateCompanyMutation();

  const [editCompanyName, setEditCompanyName] = useState<string>(
    company?.name || ""
  );
  const [editContactInfo, setEditContactInfo] = useState<string>(
    company?.contactInfo || ""
  );
  const [editCompanyAddress, setEditCompanyAddress] = useState<string>(
    company?.address || ""
  );

  
  const [editNameValue, setEditNameValue] = useState<boolean>(true);
  const [editContactValue, setEditContactValue] = useState<boolean>(true);
  const [editAddressValue, setEditAddressValue] = useState<boolean>(true);

  const d = new Date();
  const time = d.toISOString();

  const lastUpdatedAt = time.toString();
  const lastUpdatedByUserName = time.toString();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCompany({
      id: id,
      name: editCompanyName ? editCompanyName : company?.name,
      contactInfo: editContactInfo ? editContactInfo : company?.contactInfo,
      address: editCompanyAddress ? editCompanyAddress : company?.address,
      governmentRegistration: company?.governmentRegistration,
      isActive: true,
      createdAt: company?.createdAt,
      lastUpdatedAt: lastUpdatedAt,
      lastUpdatedByUserName: lastUpdatedByUserName,
    });
    setEditCompanyName("");
    setEditContactInfo("");
    setEditCompanyAddress("");
    router.push("/");
    dispatch(increment());
  };

  const handleFocusName = () => {
    setEditNameValue(false);
  };
  const handleFocusContact = () => {
    setEditContactValue(false);
  };
  const handleFocusAddress = () => {
    setEditAddressValue(false);
  };

  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className='text-center'>
          Edit Company Information
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={editNameValue ? company?.name : editCompanyName}
              onChange={(e) => setEditCompanyName(e.target.value)}
              onFocus={handleFocusName}
            />
            <Input
              size="lg"
              label="Contact Info"
              value={editContactValue ? company?.contactInfo : editContactInfo}
              onChange={(e) => setEditContactInfo(e.target.value)}
              onFocus={handleFocusContact}
            />
            <Input
              type="text"
              size="lg"
              label="Address"
              value={editAddressValue ? company?.address : editCompanyAddress}
              onChange={(e) => setEditCompanyAddress(e.target.value)}
              onFocus={handleFocusAddress}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Update
          </Button>
        </form>
      </Card>
      <br></br>
      <div className="flex w-full justify-center ">
        <Link href={"/product/addproduct"}>
          <button className=" h-[40px] w-60 text-blue-gray-50 bg-green-400 rounded-lg">
            Add more product
          </button>
        </Link>
      </div>
      <br></br>
      <div className="flex w-full justify-center ">
        <Link href={"/"}>
          <button className=" h-[40px] w-60 text-blue-gray-50 bg-green-400 rounded-lg">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditCompanyFormProps;

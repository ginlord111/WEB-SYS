import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { axiosClient } from "@/axios/axios.client";
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User } from "@/types/types";
const AdminDashboard = () => {
  const [searchKey, setSearchKey] = useState<string>('')
  const [userID, setUserID] = useState<number>()
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/all-users");
       setUsers(response?.data.users)
      console.log(response.data.users)
      console.log(users)
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  },[]);
  const handleClick = async() =>{
    // log out in laravel
    axiosClient.post('/logout').then((res) =>{
        toast.success('Succesful Logout')
      navigate('/')
      console.log(res)

    })
  }
  const handleRowClick = () => {
    // Send a request to the backend to delete the user
    axiosClient.post(`/delete/${userID}`)
      .then(() => {
        // If the deletion was successful, update the state to remove the deleted user
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userID));
      })
      .catch(error => {
        console.error(error);
      });
      return users;
  };
console.log(userID)
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchKey(e.target.value);
};

const filteredUsers = users.filter(user => {
  // Assuming you want to search in the 'fname' and 'lname' fields
  const fullName = `${user.fname} ${user.lname}`.toLowerCase();
  return fullName.includes(searchKey.toLowerCase());
});

  return (
<div>
<Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead >Email</TableHead>
          <TableHead > <input type="text" placeholder="Search User" value={searchKey} onChange={handleSearchChange} /></TableHead>
          <TableHead ><Button onClick={handleRowClick}>Delete</Button></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
    {filteredUsers.map((user) => (
          <TableRow key={user.id} className="text-black text-xl cursor-pointer" onClick={()=>setUserID(user.id)}>
                  <TableCell>{user.id}</TableCell>
          <TableCell className="font-medium">{user.fname}</TableCell>
          <TableCell>{user.lname}</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
    ))}
      </TableBody>
    </Table>

   <Button onClick={handleClick}>Log Out</Button>
</div>
  )
}

export default AdminDashboard
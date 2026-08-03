import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import {Card,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {User,Building2,Briefcase,Phone,IdCard,MapPin,FileText} from "lucide-react";
import {getMyProfile,updateProfile} from "@/services/userService";
import type {UserProfile,UpdateProfileRequest} from "@/services/userService";

const EditProfile=()=>{
 const navigate=useNavigate();
 const [profile,setProfile]=useState<UserProfile|null>(null);
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);

 const [formData,setFormData]=useState<UpdateProfileRequest>({
  firstName:"",lastName:"",employeeId:"",department:"",
  designation:"",phoneNumber:"",address:"",bio:"",preferences:""
 });

 useEffect(()=>{loadProfile()},[]);

 const loadProfile=async()=>{
  try{
   const d=await getMyProfile();
   setProfile(d);
   setFormData({
    firstName:d.firstName||"",
    lastName:d.lastName||"",
    employeeId:d.employeeId||"",
    department:d.department||"",
    designation:d.designation||"",
    phoneNumber:d.phoneNumber||"",
    address:d.address||"",
    bio:d.bio||"",
    preferences:d.preferences||""
   });
  }catch(e){
   console.error(e);
   alert("Unable to load profile.");
  }finally{
   setLoading(false);
  }
 };

 const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>
  setFormData(p=>({...p,[e.target.name]:e.target.value}));

 const handleSubmit=async(e:React.FormEvent)=>{
  e.preventDefault();
  if(!profile)return alert("Profile not found");

  try{
   setSaving(true);
   await updateProfile(profile.id,formData);
   alert("Profile updated successfully.");
   navigate("/profile");
  }catch(e){
   console.error("Update Error:",e);
   alert("Failed to update profile.");
  }finally{
   setSaving(false);
  }
 };

 if(loading)
  return <><Navbar/><div className="flex h-[80vh] items-center justify-center text-xl">Loading...</div></>;

 const fields=[
  [<User size={16}/>,"First Name","firstName"],
  [<User size={16}/>,"Last Name","lastName"],
  [<IdCard size={16}/>,"Employee ID","employeeId"],
  [<Building2 size={16}/>,"Department","department"],
  [<Briefcase size={16}/>,"Designation","designation"],
  [<Phone size={16}/>,"Phone Number","phoneNumber"]
 ];

 return <>
  <Navbar/>
  <div className="mx-auto max-w-5xl px-6 py-10">
   <Card className="border-none shadow-xl">

    <div className="rounded-t-xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
     <h1 className="text-3xl font-bold">Edit Profile</h1>
     <p className="mt-2 text-orange-100">Update your ReturnX profile details.</p>
    </div>

    <CardContent className="p-8">
     <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">

      {fields.map(([icon,label,name])=>
       <Field
        key={name as string}
        icon={icon}
        label={label}
        name={name}
        value={formData[name as keyof UpdateProfileRequest]}
        onChange={handleChange}
       />
      )}

      <TextField icon={<MapPin size={16}/>} label="Address" name="address" rows={3} value={formData.address} onChange={handleChange}/>
      <TextField icon={<FileText size={16}/>} label="Bio" name="bio" rows={4} value={formData.bio} onChange={handleChange}/>
      <TextField label="Preferences" name="preferences" rows={3} value={formData.preferences} onChange={handleChange}/>

      <div className="flex justify-end gap-3 md:col-span-2">
       <Button type="button" variant="outline" onClick={()=>navigate("/profile")}>
        Cancel
       </Button>

       <Button type="submit" disabled={saving} className="bg-orange-500 hover:bg-orange-600">
        {saving?"Saving...":"Save Changes"}
       </Button>
      </div>

     </form>
    </CardContent>

   </Card>
  </div>
 </>
};


const Field=({icon,label,name,value,onChange}:any)=>
<div>
 <Label><span className="flex items-center gap-2">{icon}{label}</span></Label>
 <Input name={name} value={value||""} onChange={onChange} className="mt-2"/>
</div>;


const TextField=({icon,label,name,value,rows,onChange}:any)=>
<div className="md:col-span-2">
 <Label><span className="flex items-center gap-2">{icon}{label}</span></Label>
 <Textarea name={name} rows={rows} value={value||""} onChange={onChange} className="mt-2"/>
</div>;

export default EditProfile;
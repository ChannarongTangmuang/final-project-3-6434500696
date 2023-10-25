"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

    if (response.ok) {
      console.log("User created successfully");
      setSignupSuccess(true);
    } else {
      const data = await response.json();
      if (data.error === "Username is already in use") {
        console.error("Username is already in use");
      } else {
        console.error("User creation failed");
      }
    }
  } catch (error) {
    console.error("Error during user creation:", error);
  }
};


  return (
    <>
      <h1 className="headtxt" >สร้างบัญชีเพื่อเข้าสู่ระบบ</h1>
      {signupSuccess ? (
        <p className="headtxt">สร้างบัญชีสำเร็จ ตอนนี้ผู้ใช้งานสามารถเข้าสู่ระบบได้แล้ว.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="headtxt" style={{ margin: '10px'}}>
            <label style={{ margin: '10px'}} htmlFor="username">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <div className="headtxt" style={{ margin: '10px'}}>
            <label style={{ margin: '10px'}} htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <div className="headtxt" style={{ margin: '10px'}}>
            <label style={{ margin: '10px'}} htmlFor="name">ชื่อ</label>
            <input
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleChange}
            />
          </div>
          <div className="headtxt">
            <button style={{ margin: '10px'}} className="btn btn-primary" type="submit">
              ลงทะเบียน
            </button>
            <Link href="/signin">
              <button style={{ margin: '10px'}} className="btn btn-primary">เข้าสู่ระบบ</button>
            </Link>
          </div>
        </form>
      )}
    </>
  );
}

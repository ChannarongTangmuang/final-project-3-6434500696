// Add the "use client" directive at the top of the file
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import backgroundImage from './bg.jpg';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const { data: session } = useSession();
    const router = useRouter();

  if (!session) {
    router.push("/signin");
    return null;
  }

    useEffect(() => {
        axios 
            .get("https://nodejs--channarongta.repl.co/products")
            .then((response) => {
                setData(response.data);
            });
    }, []);

    const addToTable = (item) => {
        setSelectedItems([...selectedItems, { ...item, quantity: 1 }]); // เพิ่ม property quantity เป็น 1
    };

    const editItem = (index) => {
        const updatedItems = [...selectedItems];
        const item = updatedItems[index];
        if (item.editing) {
            item.editing = false; // สิ้นสุดการแก้ไข
        } else {
            item.editing = true; // เริ่มการแก้ไข
        }
        setSelectedItems(updatedItems);
    };

    const increaseQuantity = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity++;
        setSelectedItems(updatedItems);
    };

    const decreaseQuantity = (index) => {
        const updatedItems = [...selectedItems];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity--;
        }
        setSelectedItems(updatedItems);
    };

    const removeItem = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems.splice(index, 1);
        setSelectedItems(updatedItems);
    };




    return (
        
            <div className={styles.App}>
                <div className={styles.row}>
                    {data.map((val, idx) => (
                        <div key={idx} className={styles.col}>
                            <img className={styles.customimage} src={val.image} />
                            <div><span className={styles.txtname}>{val.company}</span></div>
                            <p>{val.name}</p>
                            <p>{val.price} บาท</p>
                            <button onClick={() => addToTable(val)}>เลือกซื้อสินค้า</button>
                        </div>
                    ))}
                </div>
                <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ลำดับ</th>
                                <th scope="col">ชื่อสินค้า</th>
                                <th scope="col">ประเภท</th>
                                <th scope="col">ยอดชำระเงิน</th>
                                <th scope="col">จำนวน</th>
                                <th scope="col">แก้ไข</th>
                                <th scope="col">ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map((item, idx) => (
                                <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.company}</td>
                                    <td>{item.quantity * item.price} บาท</td>
                                    <td>{item.quantity} ชิ้น</td>
                                    <td>
                                        <button onClick={() => editItem(idx)}>
                                            {item.editing ? 'บันทึก' : 'แก้ไข'}
                                        </button>
                                        {item.editing && (
                                            <button onClick={() => increaseQuantity(idx)}>+</button>
                                        )}
                                        {item.editing && (
                                            <button onClick={() => decreaseQuantity(idx)}>-</button>
                                        )}
                                    </td>  
                                    <td>
                                        <button onClick={() => removeItem(idx)}>ลบ</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>

    );
}

'use client'
import React from "react";
import "./index.scss";

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    )
}
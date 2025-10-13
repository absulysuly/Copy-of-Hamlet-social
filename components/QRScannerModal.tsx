import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon } from './icons/Icons.tsx';

// BarcodeDetector is experimental, so we add its type to the window object
declare global {
    interface Window {
        BarcodeDetector: any;
    }
}

interface QRScannerModalProps {
    onClose: () => void;
    onScanSuccess: (data: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onClose, onScanSuccess }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!('BarcodeDetector' in window)) {
            setError('QR code scanning is not supported by this browser.');
            return;
        }

        const startScan = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                
                const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });

                intervalRef.current = window.setInterval(async () => {
                    if (!videoRef.current || !canvasRef.current) return;
                    
                    const canvas = canvasRef.current;
                    const video = videoRef.current;
                    const context = canvas.getContext('2d');

                    if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        
                        const barcodes = await barcodeDetector.detect(canvas);
                        if (barcodes.length > 0) {
                            onScanSuccess(barcodes[0].rawValue);
                            stopScan();
                            onClose();
                        }
                    }
                }, 500);

            } catch (err: any) {
                console.error("Camera Error:", err);
                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    setError('Camera permission denied. Please enable camera access in your browser settings.');
                } else {
                    setError('Could not access camera. Please ensure it is not in use by another application.');
                }
            }
        };

        const stopScan = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };

        startScan();

        return () => stopScan();

    }, [onScanSuccess, onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="glass-card rounded-lg shadow-xl w-full max-w-md relative text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-[var(--color-glass-border)]">
                    <h2 className="text-xl font-bold">Scan QR Code</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-4 bg-black rounded-b-lg aspect-square relative flex items-center justify-center">
                    {error ? (
                        <p className="text-center text-red-400 p-4">{error}</p>
                    ) : (
                        <>
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            <div className="absolute inset-0 border-8 border-white/30 rounded-lg pointer-events-none animate-pulse"></div>
                            <canvas ref={canvasRef} className="hidden" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRScannerModal;

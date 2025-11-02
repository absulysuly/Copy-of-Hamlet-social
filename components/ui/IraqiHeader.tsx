import { motion } from 'framer-motion';

const IraqiHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-iraq-red via-iraq-white to-iraq-green p-8 rounded-2xl text-center my-6"
        >
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-arabic" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                {title}
            </h1>
            <p className="text-gray-700">{subtitle}</p>
        </motion.div>
    );
};

export default IraqiHeader;

'use client';

import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { SignInWithGithub } from '../../components/Auth/SignInWithGithub';
import posthog from 'posthog-js';

export function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
    const { status, data: auth } = useSession();

    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-20"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div
                className="flex flex-row justify-between items-center w-full sticky top-0 z-10"
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1, delay: 1 } }
                }}
            >
                <Link href="/">
                    <h3 className="text-3xl">Bitspace</h3>
                </Link>
                <div className="flex flex-row items-center gap-x-12">
                    <Link
                        href="https://polar.sh/emilwidlund/posts/introducing-bitspace-a-playground-for-your-creative-ideas"
                        target="_blank"
                    >
                        <h3 className="text-xl">Mission</h3>
                    </Link>
                    <Link href="/preview-access">
                        <h3 className="text-xl">Preview</h3>
                    </Link>
                    <Link href="https://github.com/bitspace/bitspace" target="_blank">
                        <h3 className="text-xl">Open Source</h3>
                    </Link>
                    {status === 'authenticated' ? (
                        <div
                            className="w-11 h-11 bg-cover bg-center rounded-full"
                            style={{
                                backgroundImage: `url(${auth.user?.image})`
                            }}
                            onClick={() => {
                                signOut();
                                posthog.reset();
                            }}
                        />
                    ) : (
                        <SignInWithGithub />
                    )}
                </div>
            </motion.div>
            {children}
        </motion.main>
    );
}

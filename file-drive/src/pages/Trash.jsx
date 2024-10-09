import { Dashboard } from './Dashboard'
import { SideNav } from './dashboard/side-nav'

const Trash = () => {
    return (
        <main className="container mx-auto pt-12 min-h-screen">
            <div className="flex gap-8">
                <SideNav />
                <div className="w-full">
                    <Dashboard title="Trash" deletedOnly />
                </div>
            </div>
        </main>
    )
}

export default Trash
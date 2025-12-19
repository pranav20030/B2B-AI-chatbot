import { AuthGaurd } from "@/modules/auth/ui/components/auth-gaurd"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-gaurd";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return(
        <AuthGaurd>
            <OrganizationGuard>
               {children}
            </OrganizationGuard>
        </AuthGaurd>
    )
}

export default Layout;
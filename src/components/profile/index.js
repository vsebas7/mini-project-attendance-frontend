function ProfileDetailCard ({
    username ="",
    email="",
    dob="",
    gender="",
    phone=""
}) {
    return (
        <div class=" w-full flex flex-row items-center p-5">
            <div className="w-full h-full flex flex-col">
                <h5 class="mb-5 text-xl font-medium text-gray-900 dark:text-white">{username}</h5>
                <div className="flex justify-between">
                    <div className="flex flex-col ">
                        Email
                    <span class="text-sm mt-1 text-gray-500 dark:text-gray-400">{email}</span>
                    </div>
                    <div className="flex flex-col">
                        Gender
                    <span class="text-sm mt-1 text-gray-500 dark:text-gray-400">{gender}</span>
                    </div>
                    <div className="flex flex-col">
                        D.O.B
                    <span class="text-sm mt-1 text-gray-500 dark:text-gray-400">{dob}</span>
                    </div>
                    <div className="flex flex-col">
                        Phone
                    <span class="text-sm mt-1 text-gray-500 dark:text-gray-400">0{phone}</span>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default function RenderProfileDetailCard ({
    profile = []
}) {
    return (
        <ProfileDetailCard key={profile.id}
            username={profile.username}
            email={profile.email}
            dob={profile.dob}
            gender = {profile.gender}
            phone = {profile.phone}
        />
    )
}


import type { ProjectDynamicMemberT } from '@/lib/types/pages'
import React from 'react'
import ProjectMemberItem from './ProjectMemberItem'
import ProjectMemberOutSideItem from './ProjectMemberOutSideItem'
import { TypographyH2 } from '@/components/typography'

export default function MembersArray({
    dict,
    locale,
    data
}: {
    dict: Dictionary,
    locale: string,
    data: ProjectDynamicMemberT[]
}) {
    if (data.length === 0) return null

    return (
        <div className='w-full lg:pt-28 pt-20'>
            <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
              {dict.Entities.Projects.members}
            </TypographyH2>
            <div id="members" className="grid md:grid-cols-2 grid-cols-1 auto-rows-auto lg:gap-8 gap-6">
                {data.map((item, indx) => (
                    <MemberItem 
                        key={indx} 
                        locale={locale}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

function MemberItem({
    locale,
    data
}: {
    locale: string,
    data: ProjectDynamicMemberT
}) {

    switch (data.__typename) {
        case "ComponentProjectsProjectMember":
            return <ProjectMemberItem data={data} locale={locale} />;

        case "ComponentProjectsProjectMemberOutSide":
            return <ProjectMemberOutSideItem data={data} />;

        default:
            const exhaustiveCheck = data;
            throw new Error(`Unhandled case: ${exhaustiveCheck}`);
    }
}
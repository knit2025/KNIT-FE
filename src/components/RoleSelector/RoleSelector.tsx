import type { FamilyRole } from '../../types/question';

interface RoleSelectorProps {
  selectedRole?: FamilyRole;
  onSelect: (role: FamilyRole) => void;
  label: string;
}

const roles: FamilyRole[] = ['엄마', '아빠', '아들', '딸', '할머니', '할아버지', '기타'];

export const RoleSelector = ({ selectedRole, onSelect, label }: RoleSelectorProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">{label}</h3>
      <div className="flex flex-wrap gap-3">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onSelect(role)}
            className={`
              px-6 py-3 rounded-full text-base font-medium transition-all
              ${
                selectedRole === role
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 border border-gray-300'
              }
            `}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

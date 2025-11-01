import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('server')
    .setDescription('서버 정보를 표시합니다.');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    // 서버가 없는 DM에서는 작동하지 않음
    if (!interaction.guild) {
        await interaction.reply({ content: '이 명령어는 서버에서만 사용할 수 있습니다.', ephemeral: true });
        return;
    }

    const { guild } = interaction;

    // 서버 생성 일자 포맷팅
    const createdAt = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(guild.createdAt);

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${guild.name} 서버 정보`)
        .setThumbnail(guild.iconURL() || '')
        .addFields(
            { name: '소유자', value: `<@${guild.ownerId}>`, inline: true },
            { name: '멤버 수', value: `${guild.memberCount}명`, inline: true },
            { name: '서버 ID', value: guild.id, inline: true },
            { name: '생성일', value: createdAt, inline: true },
            { name: '채널 수', value: `${guild.channels.cache.size}개`, inline: true },
            { name: '이모지 수', value: `${guild.emojis.cache.size}개`, inline: true }
        )
        .setFooter({ text: '서버 정보 요청됨' })
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}
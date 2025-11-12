import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('도움말을 표시합니다.')

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('🔍 도움말')
        .setDescription('도움말을 표시합니다.')
        .setThumbnail(interaction.client.user?.displayAvatarURL() || '')
        .setTimestamp()
        .setFooter({
            text: `요청자: ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL()
        });

    embed.addFields(
        { name: '명령어 사용법', value: '명령어를 입력하면 도움말을 표시합니다.', inline: false },
        { name: '명령어 예시', value: '/ping, /server, /getCharacter, /uidSearch, /getlightconeInfo', inline: false },
        { name: '명령어 설명', value: 'ping: 봇의 응답 속도를 확인합니다.\nserver: 서버 정보를 표시합니다.\nuidSearch: uid로 사용자 정보를 확인합니다.\ngetCharacter: 모든 캐릭터의 이름과 속성을 확인합니다.\ngetlightconeInfo: 광추 이름으로 운명의 길과 광추 등급을 확인할 수 있습니다.', inline: false }

    );


    await interaction.reply({ embeds: [embed] });
}